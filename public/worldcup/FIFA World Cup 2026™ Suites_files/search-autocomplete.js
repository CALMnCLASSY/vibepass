(function ($) {

const isLocal = window.location.hostname.startsWith("local.");
const algoliaCfg = {
    appId: isLocal ? '7YBEXRNILY' : 'ONZ5UYNDHI',
    apiKey: isLocal ? '6b24cc8afd36cb371486fdfccad96169' : 'cd9958d5a487a75fc6eda5566a75e1b8',
};
// console.log('AG', algoliaCfg);

function debouncePromise(fn, time) {
    let timerId = undefined;
    return function debounced(...args) {
        if (timerId) {
        clearTimeout(timerId);
        }

        return new Promise((resolve) => {
            timerId = setTimeout(() => resolve(fn(...args)), time);
        });
    };
}

const debounced = debouncePromise((items) => Promise.resolve(items), 100);

function onResultClick(itemUrl) {
    window.location.href = itemUrl;
}

window.setupAutocomplete = function(templatePath, isAlgoliaEnabled) {
    $(document).ready(function () {

        if (isAlgoliaEnabled) {
            const searchClient = algoliasearch(algoliaCfg.appId, algoliaCfg.apiKey);
            const algolia = window['@algolia/autocomplete-js'];
            const minEventStartDate = Math.floor(Date.now() / 1000);
            // const minEventStartDate = new Date('2024-09-01').getTime() / 1000;

            window.algoliaAutocomplete = algolia.autocomplete({
                container: '#algolia-search',
                detachedMediaQuery: 'none', // Disable detached mode
                placeholder: 'Search for an Event, Team/Artist, or Venue...',
                classNames: {
                    submitButton: 'icon-far-fa-search',
                },
                getSources({ query }) {
                    let optionalWords = "";

                    // We have a way to customize ranking using index Rules configured in Algolia dashboard (see
                    // https://dashboard.algolia.com/apps/ONZ5UYNDHI/rules/teams_v1). That said, the code-based approach
                    // shown below gives us much more control; leaving it here in case we need to use it in the future.

                    /*
                    // If user searches for "dallas" (and not "dallas cowboys") we want to artificially boost the 
                    // ranking of the Dallas Cowboys.
                    const dallasRegex = /(?:^|\s+)dallas(?:$|\s+)/i;
                    if (dallasRegex.test(query) && !/dallas cowboys/i.test(query)) {
                        // Pretend user typed in "dallas cowboys" instead of just "dallas"
                        query = query.replace(dallasRegex, "dallas cowboys ");
                        // Make "cowboys" optional so that we still get results if user only types "dallas"
                        optionalWords += " cowboys";
                    }
                    */

                    return query.trim().length < 2 ? [] : debounced([{
                        sourceId: 'teams',
                        getItemUrl({ item }) {
                            return `/all-suites/${item.permalink}?ref=search`;
                        },
                        getItems() {
                            return algolia.getAlgoliaResults({
                                searchClient,
                                queries: [
                                    {
                                        indexName: 'teams_v1',
                                        query,
                                        params: {
                                            optionalWords: optionalWords,
                                            hitsPerPage: 5,
                                        },
                                    },
                                ],
                            });
                        },
                        templates: {
                            header() {
                                return 'Teams';
                            },
                            item({ item, components, html }) {
                                return html`
                                    <div
                                        class="search-result-row"
                                        onClick=${(event) => {
                                            onResultClick(`/all-suites/${item.permalink}?ref=search`);
                                        }}
                                    >
                                        <span class="stadium_icon_sm stadium_icon_${item.league_id}"></span>
                                        <a href="/all-suites/${item.permalink}?ref=search" class="search-result">
                                            ${item.name}
                                        </a>
                                    </div>
                                `;
                            },
                        },
                    }, {
                        sourceId: "stadiums",
                        getItemUrl({ item }) {
                            return `/all-suites/${item.permalink}?ref=search`;
                        },
                        getItems() {
                            return algolia.getAlgoliaResults({
                                searchClient,
                                queries: [
                                    {
                                        indexName: 'stadiums_v1',
                                        query,
                                        params: {
                                            hitsPerPage: 5
                                        },
                                    },
                                ],
                            });
                        },
                        templates: {
                            // See https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/templates/#returning-html
                            header() {
                                return 'Venue';
                            },
                            item({ item, components, html }) {
                                return html`
                                    <div
                                        class="search-result-row"
                                        onClick=${(event) => {
                                            onResultClick(`/all-suites/${item.permalink}?ref=search`);
                                        }}
                                    >
                                        <span class="stadium_icon_sm stadium_icon_0"></span>
                                        <a href="/all-suites/${item.permalink}?ref=search" class="search-result">
                                            ${item.name} (${item.location})
                                        </a>
                                    </div>
                                `;
                            },
                        },
                    }, {
                        sourceId: "events",
                        getItemUrl({ item }) {
                            return `${item.marketplace_v1_url}?ref=search`;
                        },
                        getItems() {
                            return algolia.getAlgoliaResults({
                                searchClient,
                                queries: [
                                    {
                                        indexName: 'events_v1',
                                        query,
                                        params: {
                                            hitsPerPage: 5,
                                            // Ensure that filter out events that have already happened
                                            filters: `date_unix_sec > ${minEventStartDate}`,
                                        },
                                    },
                                ],
                            });
                        },
                        templates: {
                            // See https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/templates/#returning-html
                            header() {
                                return 'Events';
                            },
                            item({ item, components, html }) {
                                // console.log({ item, components });
                                return html`
                                    <div
                                        class="search-result-row"
                                        onClick=${(event) => {
                                            onResultClick(`${item.marketplace_v1_url}?ref=search`);
                                        }}
                                    >
                                        <span class="stadium_icon_sm event_icon"></span>
                                        <a href="${item.marketplace_v1_url}?ref=search" class="search-result">
                                            ${item.event_name} / ${item.venue} / ${item.date_formatted}
                                        </a>
                                    </div>
                                `;
                            },
                        },
                    }, {
                        // The autocomplete library doesn't give us an easy way to add a footer that is shown
                        // independent of specific sources. If you add a footer for a specific source, then that footer
                        // is only visible if search results exist (or if you also display a "no results" message). The
                        // work-around we'll use is to create a source that always returns no results, and then add a
                        // footer to that source.
                        sourceId: "footer-only-no-results",
                        getItems() {
                            return Promise.resolve([]);
                        },
                        templates: {
                            noResults({ html }) {
                                return html`<div style="display: none;"></div>`;
                            },
                            footer({ html, state }) {
                                return html`
                                    <div class="non-result see-all ui-menu-item">
                                        <a
                                            class="ui-menu-item-wrapper"
                                            href="/search-results/?term=${encodeURIComponent(state.query)}"
                                        >
                                            See All Results
                                        </a>
                                    </div>
                                `;
                            },
                        },
                    }]);
                },
                // debug: true, // ⚠️ Only for local dev: keep search results pane open after blur
                onSubmit({ state }) {
                    window.location.href = `/search-results/?term=${encodeURIComponent(state.query)}`;
                },
            });

            // focus on search input on element load
            $("#algolia-search input").focus();
        } else {
            var searchApiPath = templatePath + "/search/search.php";
            var minLength     = 2;
            var searchInput   = $("#all_suites_search");

            // focus on search input on element load
            searchInput.focus();

            // on input hide the empty message if the chars in the field are less than minLength
            searchInput.on("input", function (event) {
                if ($(this).val().length < minLength) {
                    $("#search-empty-message").hide();
                    $(".loading_small").css("display", "none");
                } else {
                    $(".loading_small").css("display", "block");
                }
            });

            // autocomplete api
            var autocompleteInstance = searchInput.autocomplete({
                source: searchApiPath,
                appendTo: ".seg-search__input-wrapper",
                focus: function (event, ui) {
                    $(event.currentTarget).find("li").css("background", "none")
                    $(event.currentTarget).find("a.ui-state-focus").parent().css("background", "#f1f7ff")
                },
                select: function (event, ui) {
                    var toElement = event.originalEvent.toElement;
                    var elClicked = toElement ? toElement.localName : false;

                    if (ui.item.url.length && (event.key === "Enter" || elClicked === "li")) {
                        window.location = ui.item.url;
                    }
                },
                create: function () {
                    $(this).data("ui-autocomplete")._renderItem = function (ul, item) {
                        var li = $("<li></li>");

                        // if the item has a url, it is a result and gets an a tag inside
                        // if not it does not and the item will not be selectable via keyboard
                        if (item.url.length) {
                            var icon  = "<span class='stadium_icon_sm stadium_icon_" + item.league + "'></span>";
                            var a     = $("<a></a>");

                            a.html(icon + item.label);
                            a.attr("href", item.url);
                            li.html(a);
                        } else {
                            li.html(item.label);
                        }

                        li.addClass(item.class);

                        return li.appendTo(ul);
                    };
                },
                response: function (event, ui) {
                    // after search completed, before menu is shown, show empty results message if no results
                    $(".loading_small").css("display", "none");
                    if (ui.content.length === 0) {
                        $("#search-empty-message").show();
                    } else {
                        $("#search-empty-message").hide();
                    }
                },
                html: true,
                minLength: minLength
            });

            // override the close method which closes the menu when clicking a link
            autocompleteInstance.data("uiAutocomplete").close = function (event) {
                if (event && event.type !== "menuselect") {
                    $("ul.ui-autocomplete").hide();
                }
            };

            // make sure search happens again upon refocusing on autocomplete
            autocompleteInstance.focus(function () {
                var val = $(this).val();
                if (val.length >= minLength) {
                    $(this).autocomplete("search", val);
                }
            });
        }
    });
};

})(jQuery);

*** Settings ***
Documentation    This suite tests everything related to searching accounts

Metadata    Executed At    ${BASE_URL}
Metadata    Source Code    ${GITHUB_SOURCE} 

Suite Setup       Suite Setup
Suite Teardown    Suite Teardown

Resource    ./fixture.robot    

*** Test Cases ***
Search Accounts
    [Tags]    default    accounts    search_accounts    

    ${setup}=             Get File                      ${CURDIR}/setup.js
    Execute JavaScript    ${setup}; setupAccounts();    

    Reload Page
    Capture Page Screenshot

    Should Have Paginator           
    Should Have 10 Account Cards

    Search For Am
    Should Have 2 Account Cards
    Should Not Have Paginator


Search Favorite Accounts
    [Tags]    default    accounts    search_accounts    

    Clear Search Field
    Should Have 10 Account Cards
    Should Not Have Any Favorites

    ${setup}=             Get File                        ${CURDIR}/setup.js
    Execute JavaScript    ${setup}; setupFavorites(); 

    Reload Page
    Capture Page Screenshot

    Should Have 10 Account Cards
    Should Have 2 Favorites

    Turn On Favorites Switch
    Should Have 2 Account Cards
    Search For Lab
    Should Have 1 Account Cards

Paginate Accounts
    [Tags]    default    accounts    search_accounts    

    Clear Search Field
    Turn Off Favorites Switch

    Should Have Paginator           
    Should Have 10 Account Cards    

    Paginate Next Page
    Should Have 1 Account Cards 

    Paginate Previous Page
    Should Have 10 Account Cards 

*** Keywords ***
Paginate Next Page
    ${nextPageButton}=    Set Variable         ${CSS_MAIN_CONTENT} #paginator > button:nth-child(5)
    Click Element         ${nextPageButton}

Paginate Previous Page
    ${previousPageButton}=    Set Variable             ${CSS_MAIN_CONTENT} #paginator > button:nth-child(2)    
    Click Element             ${previousPageButton}    

Should Have Paginator
    Wait Until Page Contains Element    ${CSS_MAIN_CONTENT} #paginator    ${DEFAULT_TIMEOUT}

Should Not Have Any Favorites
    Page Should Not Contain Element    ${CSS_MAIN_CONTENT} #favorite-on

Should Have ${amount} Favorites
    ${favoriteButtonOn}=           Set Variable          ${CSS_MAIN_CONTENT} #favorite-on
    Wait Until Keyword Succeeds    ${DEFAULT_TIMEOUT}    250ms                               Expect Element Count    ${favoriteButtonOn}    ${amount}

Turn On Favorites Switch
    ${favoriteSwitchOff}=               Set Variable            ${CSS_MAIN_CONTENT} #switch-favorites-off
    ${favoriteSwitchOn}=                Set Variable            ${CSS_MAIN_CONTENT} #switch-favorites-on
    Page Should Contain Element         ${favoriteSwitchOff}
    Click Element                       ${favoriteSwitchOff}
    Wait Until Page Contains Element    ${favoriteSwitchOn}     ${DEFAULT_TIMEOUT}

Turn Off Favorites Switch
    ${favoriteSwitchOff}=               Set Variable            ${CSS_MAIN_CONTENT} #switch-favorites-off
    ${favoriteSwitchOn}=                Set Variable            ${CSS_MAIN_CONTENT} #switch-favorites-on
    Page Should Contain Element         ${favoriteSwitchOn}
    Click Element                       ${favoriteSwitchOn}
    Wait Until Page Contains Element    ${favoriteSwitchOff}    ${DEFAULT_TIMEOUT}                           

*** Settings ***
Documentation    This suite tests everything related to searching accounts

Metadata    Executed At    ${BASE_URL}
Metadata    Source Code    ${GITHUB_SOURCE} 

Suite Setup       Suite Setup
Suite Teardown    Suite Teardown

Resource    ./fixture.robot    

*** Variables ***
${issuer}    Google
${label}     user001@email.com    

*** Test Cases ***
Search Accounts
    [Tags]    default    accounts    search_accounts    

    ${js}=          Get File              ${CURDIR}/setup_accounts.js
    ${accounts}=    Execute JavaScript    ${js};return getAccounts();    

    Reload Page
    Capture Page Screenshot

    Should Have Paginator           
    Should Have 10 Account Cards

    Search For Am
    Should Have 2 Account Cards
    Should Not Have Paginator

*** Test Cases ***
Search Favorite Accounts
    [Tags]    default    accounts    search_accounts    

    Clear Search Field
    Should Have 10 Account Cards

    Should Not Have Any Favorites

    Search For Gi
    Should Have 2 Account Cards

    Mark Visible Accounts As Favorite
    Should Have 2 Account Cards

    Clear Search Field              
    Should Have 10 Account Cards    

    Turn On Favorites Switch
    Should Have 2 Account Cards
    Search For Lab
    Should Have 1 Account Cards

*** Keywords ***
Should Have Paginator
    Wait Until Page Contains Element    ${CSS_MAIN_CONTENT} #paginator    ${DEFAULT_TIMEOUT}

Should Not Have Any Favorites
    Page Should Not Contain Element    ${CSS_MAIN_CONTENT} #favorite-on

Mark Visible Accounts As Favorite
    ${favoriteButtonOff}=         Set Variable         ${CSS_MAIN_CONTENT} #favorite-off
    ${favoriteButtonOffCount}=    Get Element Count    ${favoriteButtonOff}

    ${favoriteButtons}=    Get WebElements    ${favoriteButtonOff}

    FOR              ${favorite}    IN    @{favoriteButtons}
    Click Element    ${favorite}    
    END

    ${favoriteButtonOn}=           Set Variable          ${CSS_MAIN_CONTENT} #favorite-on
    Wait Until Keyword Succeeds    ${DEFAULT_TIMEOUT}    250ms                               Expect Element Count    ${favoriteButtonOn}    ${favoriteButtonOffCount}

Turn On Favorites Switch
    ${favoriteSwitch}=             Set Variable         ${CSS_MAIN_CONTENT} #switch-favorites
    Page Should Contain Element    ${favoriteSwitch}
    Click Element                  ${favoriteSwitch}

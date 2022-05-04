*** Settings ***
Resource    ../fixture.robot

*** Keywords ***
Should Have ${amount} Account Cards
    ${accountCard}=                Set Variable          ${CSS_MAIN_CONTENT} #account
    Wait Until Keyword Succeeds    ${DEFAULT_TIMEOUT}    250ms                           Expect Element Count    ${accountCard}    ${amount}

Navigate To Accounts Page
    Click Accounts In Menu
    Should Be On Accounts Page

Click Accounts In Menu
    ${accountsButton}=                  Set Variable         ${CSS_MAIN_NAVIGATION} #accounts-nav 
    Wait Until Page Contains Element    ${accountsButton}    ${DEFAULT_TIMEOUT}
    Click Element                       ${accountsButton}

Search For ${searchTerm}
    Input Text    ${CSS_MAIN_CONTENT} #search-term    ${searchTerm} 

Clear Search Field
    ${searchField}=    Set Variable    ${CSS_MAIN_CONTENT} #search-term

    ${value}=     Get Value     ${searchField}
    ${length}=    Get Length    ${value}

    FOR           ${i}              IN RANGE      ${length}
    Press Keys    ${searchField}    \BACKSPACE
    END

Should Not Have Paginator
    Page Should Not Contain Element    ${CSS_MAIN_CONTENT} #paginator
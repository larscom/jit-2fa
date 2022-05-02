*** Settings ***
Resource    ../fixture.robot

*** Keywords ***
Should Have ${amount} Account Cards
    ${count}=         Get Element Count        ${CSS_MAIN_CONTENT} #account
    Should Be True    ${count} == ${amount}

Navigate To Accounts Page
    Click Accounts In Menu
    Should Be On Accounts Page

Click Accounts In Menu
    ${accountsButton}=                  Set Variable         ${CSS_MAIN_NAVIGATION} #accounts-nav 
    Wait Until Page Contains Element    ${accountsButton}    ${DEFAULT_TIMEOUT}
    Click Element                       ${accountsButton}
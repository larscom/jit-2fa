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
Search account
    [Tags]    default    accounts    search_accounts    

    ${js}=          Get File              ${CURDIR}/setup_accounts.js
    ${accounts}=    Execute JavaScript    ${js};return getAccounts();    

    Log                        ${accounts}
    Reload Page
    Capture Page Screenshot

    Should Have Paginator    

*** Keywords ***
Should Have Paginator
    Wait Until Page Contains Element    ${CSS_MAIN_CONTENT} #paginator    ${DEFAULT_TIMEOUT}

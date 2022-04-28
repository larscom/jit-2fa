*** Settings ***
Metadata    Executed At    ${BASE_URL}
Metadata    Source Code    ${GITHUB_SOURCE} 

Suite Setup       Suite Setup
Suite Teardown    Suite Teardown

Resource    ./fixture.robot    

*** Variables ***
${issuer}    Google
${label}     myaccount@gmail.com    

*** Test Cases ***
Navigate To Accounts Page
    [Tags]    default    accounts    no_accounts

    Navigate To Home

    Click Accounts In Menu

    Should Be On Accounts Page

    Should Show Message About Having No Accounts

Create New Account For First Time
    [Tags]    default    accounts    no_accounts

    Click Create Account Button

    Should Be On Create Account Page

    Fill Required Fields

    Click Create Button 

Validate Newly Created Account
    [Tags]    default    accounts    no_accounts    

    Should Be On Accounts Page    

    Should Have 1 Account Cards

    Validate Account Card    

*** Keywords ***
Validate Account Card
    Element Text Should Be         ${CSS_MAIN_CONTENT} #issuer       ${issuer}    
    Element Text Should Be         ${CSS_MAIN_CONTENT} #label        ${label}     
    Element Text Should Be         ${CSS_MAIN_CONTENT} #algorithm    SHA1
    Element Text Should Be         ${CSS_MAIN_CONTENT} #digits       6
    Element Text Should Be         ${CSS_MAIN_CONTENT} #period       30
    Page Should Contain Element    ${CSS_MAIN_CONTENT} #copy
    Validate Generated Token       

Validate Generated Token
    ${token}=         Get Text              ${CSS_MAIN_CONTENT} #token    
    ${match}=         Get Regexp Matches    ${token}                      ^[0-9]{6}$
    Should Be True    ${match}

Click Create Button
    Click Element    ${CSS_MAIN_CONTENT} #submit-account

Fill Required Fields
    Input Text    ${CSS_MAIN_CONTENT} #issuer    ${issuer} 
    Input Text    ${CSS_MAIN_CONTENT} #label     ${label}
    Input Text    ${CSS_MAIN_CONTENT} #secret    ABTB4P3DIO2YWXP6Y6H5B2KIMDZDY

Click Accounts In Menu
    ${accountsButton}=                  Set Variable         ${CSS_MAIN_NAVIGATION} #accounts-nav 
    Wait Until Page Contains Element    ${accountsButton}    ${DEFAULT_TIMEOUT}
    Click Element                       ${accountsButton}

Should Be On ${page} Page
    Wait Until Element Contains    ${CSS_MAIN_CONTENT} #page-title    ${page}    ${DEFAULT_TIMEOUT}

Should Show Message About Having No Accounts
    Element Text Should Be    ${CSS_MAIN_CONTENT} #no-accounts-message    You don't have any account yet...    

Click Create Account Button
    ${createAccountButton}=        Set Variable              ${CSS_MAIN_CONTENT} #create-account
    Page Should Contain Element    ${createAccountButton}
    Click Element                  ${createAccountButton}
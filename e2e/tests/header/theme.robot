*** Settings ***
Documentation    This suite tests the dark and light theme button in the header

Metadata    Executed At    ${BASE_URL}
Metadata    Source Code    ${GITHUB_SOURCE} 

Suite Setup       Suite Setup
Suite Teardown    Suite Teardown

Resource    ./fixture.robot

*** Variables ***
${lightTheme}    rgba(248, 249, 250, 1)
${darkTheme}     rgba(20, 21, 23, 1)       

*** Test Cases ***
Switch Between Light And Dark Theme
    [Tags]    default    header    theme    

    Should Have Color Scheme    ${lightTheme}

    Toggle Color Scheme

    Should Have Color Scheme    ${darkTheme}

    Reload Page

    Should Have Color Scheme    ${darkTheme}

    Toggle Color Scheme

    Should Have Color Scheme    ${lightTheme}

*** Keywords ***
Toggle Color Scheme
    ${colorSchemeButton}=          Set Variable            css:button#switch-color-scheme 
    Page Should Contain Element    ${colorSchemeButton}    
    Click Element                  ${colorSchemeButton}    

Should Have Color Scheme
    [Arguments]    ${colorScheme}

    ${style}=                     Get CSS Property Value    ${CSS_MAIN_CONTENT}    background-color
    Log                           ${style}
    Should Be Equal As Strings    ${style}                  ${colorScheme}

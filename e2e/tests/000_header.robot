*** Settings ***
Suite Setup       Suite Setup
Suite Teardown    Suite Teardown
Resource          fixture.robot

*** Variables ***
${lightTheme}    rgba(248, 249, 250, 1)
${darkTheme}     rgba(20, 21, 23, 1)       

*** Test Cases ***
Switch between light and dark theme and persist through page reload
    [Tags]    default    header

    Navigate To Home

    Should Have Color Scheme    ${lightTheme}

    Toggle Color Scheme

    Should Have Color Scheme    ${darkTheme}

    Reload Page

    Should Have Color Scheme    ${darkTheme}

    Toggle Color Scheme

    Should Have Color Scheme    ${lightTheme}

*** Keywords ***
Toggle Color Scheme
    ${colorSchemeButton}=               Set Variable            css:button#switch-color-scheme 
    Wait Until Page Contains Element    ${colorSchemeButton}    ${DEFAULT_TIMEOUT}
    Click Element                       ${colorSchemeButton}    

Should Have Color Scheme
    [Arguments]    ${colorScheme}

    ${style}=                     Get CSS Property Value    class:mantine-AppShell-main    background-color
    Log                           ${style}
    Should Be Equal As Strings    ${style}                  ${colorScheme}

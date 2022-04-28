*** Keywords ***
Suite Setup
    ChromeDriver Setup

Suite Teardown
    Close All Browsers

ChromeDriver Setup
    ${chrome options} =    Evaluate             sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method            ${chrome options}    add_argument                                         headless
    Call Method            ${chrome options}    add_argument                                         disable-gpu
    Call Method            ${chrome options}    add_argument                                         disable-extensions
    Call Method            ${chrome options}    add_argument                                         disable-dev-shm-usage
    Call Method            ${chrome options}    add_argument                                         no-sandbox
    Create Webdriver       Chrome               chrome_options=${chrome options}
    Set Window Size        1920                 1080

Navigate To Home
    Log                            ${BASE_URL}
    Go To                          ${BASE_URL}
    Wait Until Element Contains    css:div#top-bar-title    Just In Time    ${DEFAULT_TIMEOUT}

Get CSS Property Value
    [Arguments]    ${locator}    ${propertyName}

    ${css}=      Get WebElement    ${locator}
    ${value}=    Call Method       ${css}        value_of_css_property    ${propertyName}
    [Return]     ${value}          
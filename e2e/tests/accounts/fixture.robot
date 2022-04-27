*** Settings ***
Resource    ../fixture.robot

*** Keywords ***
Should Have ${amount} Account Cards
    ${count}=         Get Element Count        ${CSS_MAIN_CONTENT} #account
    Should Be True    ${count} == ${amount}

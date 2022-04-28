*** Settings ***
Library    SeleniumLibrary
Library    OperatingSystem
Library    String

Resource    ./selectors.robot
Resource    ./keywords.robot

*** Variables ***
${BROWSER}            Chrome
${GITHUB_SOURCE}      https://github.com/larscom/jit-2fa
${BASE_URL}           %{BASE_URL}
${DEFAULT_TIMEOUT}    2s

Feature: Getting Started

  @smoke @regression
  Scenario: A1 - Open an account successfully
    Given I am on the ZincBank sign-up page
    When I open an account with a unique email and password
    Then I should see the account approval message

  @smoke @regression
  Scenario: A2 - Sign in with correct credentials
    Given I have an existing ZincBank account
    When I sign in with the correct credentials
    Then I should be taken to the dashboard

  @regression
  Scenario: A2 - Sign in with an incorrect password
    Given I have an existing ZincBank account
    When I sign in with an incorrect password
    Then I should see a sign-in error and remain on the login page

  @regression
  Scenario: A3 - Sign up with an already-registered email is rejected
    Given I have an existing ZincBank account
    When I try to open another account with the same email
    Then I should not reach the approval screen

@regression
Feature: Statements and History

  Background:
    Given I am signed in to ZincBank

  @smoke
  Scenario: F1 - View the transaction history for an account
    When I open the transactions page
    Then I should see the transaction history for the selected account

  Scenario: F2 - Filter transactions by date range
    When I open the transactions page
    And I apply a date range filter
    Then the transactions should be filtered to that range

  Scenario: F3 - Download a monthly statement
    When I open the transactions page
    Then I should see a statement download option for the account

  Scenario: F4 - Card statement is available
    When I open the transactions page
    Then I should see the card statement option

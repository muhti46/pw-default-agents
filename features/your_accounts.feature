Feature: Your Accounts

  Background:
    Given I am signed in to ZincBank

  @smoke @regression
  Scenario: B1 - Customer sees all their accounts with balances
    When I view my accounts
    Then I should see my checking account with a balance

  @regression
  Scenario: B2 - Open an account and see payment details
    When I open the first account
    Then I should see the account payment details

  @regression
  Scenario: B3 - Open an additional account self-service
    When I open a savings account
    Then a savings account should be listed

  @smoke @regression
  Scenario: B4 - Direct access to a non-existent account is denied
    When I navigate to a non-existent account
    Then I should see a 404 not found page

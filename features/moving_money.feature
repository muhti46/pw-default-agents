Feature: Moving Money

  Background:
    Given I am signed in to ZincBank

  @regression
  Scenario: D1 - Transfer between my own accounts
    When I transfer money between my accounts
    Then the transfer should be completed

  @regression
  Scenario: D2 - Pay a company I owe
    Given I have a saved payee
    When I pay a bill to the payee
    Then the bill payment should be completed

  @smoke @regression
  Scenario: D3 - Add a payee to my list
    When I add a payee to my list
    Then the payee should appear in my list

  @smoke @regression
  Scenario: D4 - Transfer with insufficient funds is blocked
    When I try to transfer more than I have
    Then I should see an insufficient funds error and no transfer happens

  @regression
  Scenario: D5 - Pressing pay twice does not charge twice
    When I submit the transfer twice
    Then only one transfer should be recorded

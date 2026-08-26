@regression
Feature: Credit Card

  Background:
    Given I am signed in to ZincBank

  @smoke
  Scenario: G2 - Approved customer sees their card details
    When I open the cards page
    Then I should see my card with limit, available credit and APR

  Scenario: G4 - Pay my card from my current account
    When I open the cards page
    Then I should see the pay card form

  Scenario: G5 - Download my card statement
    When I open the cards page
    Then I should see a statement download link

  Scenario: G6 - Customer with a card cannot apply again
    When I open the cards page
    Then I should not see a card application form

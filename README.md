# Elma TCG

This page defines rules for a possible trading card game based on Elastomania (online). 

Earn points by battling level cards with your Kuski cards.

#### Ways to win the game

- The first player to reach 100 points wins the game.
- A player loses the game if he or she is forced to draw a card and cannot do it.

## Basic concepts

#### Player
A player is one of the people in the game. The active player is the player whose turn it is. The other players are nonactive players.

#### Kuski
Kuski cards are the ones that will help you earn points to win, these are you soldiers in the game.

#### Level
Level cards are added to a queue by Kuskis, were the first level on the queue is played as a battle. When a battle ends, the next level on the queue is played. Kuskis battle over levels in this way to earn points.

#### Game field
The game field consist in several areas, some shared between the players.
 
Kuskis area: each player has an area for playing their Kuski cards, that can be sub divided into offline and online cards. 

Battle area: both players share a battle area, composed of the current battle and queue sub areas.

Discard and ban piles: cards can be disposed into the discard pile or explicitly banned from the game into the ban pile.


## Cards

### Parts of a card

The parts of a card are name, illustration, type line, text box, personal records, battle length range, illustration credit, legal text, and collector number. Some cards may have more than one of any or all of these parts.

#### Name
The name of a card is on its upper left corner. This is a unique name that identifies a card.

#### Illustration
The illustration is printed on the upper half of a card and has no effect on game play.

#### Type line
The type line is directly below the illustration. It contains the card’s card type(s). It also contains the card’s subtype(s), if applicable. Some effects set an object’s card type. In such cases, the new card type(s) replaces any existing card types, unless the effect specifies that it retains their prior card type.

#### Text box
The text box is printed on the lower half of the card. It usually contains rules text defining the card’s abilities. The text box may also contain italicised text that has no game function.

If a rule is described with a keyword it may contain the explanation written in italics and between parenthesis. For example: "First Finish (Only the first finish of each Kuski is taken into account in the result)."

#### Personal Records
A Kuski card has personal record times (or PRs for short) shown at the bottom of the card. These tell their personal best time they can accomplish in a level during a battle for each consecutive turn they play that battle under their owner's control.

#### Battle length range
A level card defines a range or single number that represent the possible battle length(s) this level can be started with. This length(s) are shown at the bottom right of a level card.

> #### Information below the text box `(To be defined)`
> Cards may feature text below the text box that has no effect on game play.
> A card’s rarity is indicated with a single letter following the collector number.
> The illustration credit for a card follows the paintbrush icon.

### Card types

#### Kuski

An active player may put into play a Kuski card from his or her hand during the main phase. By default, only one Kuski can be played per turn in this way, and it enters the game as offline.

Played Kuskis can be at one area of the game and on one or more states: offline or online, playing a battle or playing an after battle, discarded or banned from the game.

Kuskis that started this turn as offline can be put online by their active player. But by default, only one Kuski can be moved from offline to online per turn.

If a Kuski is discarded or banned from the game, it is no longer considered online nor offline.

Kuskis define the times they can achieve during a battle for each turn they play the ongoing battle. These times are defined in the personal records (PRs) line.

For example: `38.5 | 36.0 | NF | 34.8`. This reads as:
1. When the Kuski enters an ongoing battle, its best time is equal to the first personal record (PR), being 38.5 seconds in this example.
2. On each following turn that the Kuski keeps playing that battle, it improves itss best time with the next PR on the list. For this example, on the next turn of his or her owner the Kuski will improve up to 36.0 seconds.
3. The third PR on the list specifies NF or No Finish, meaning that after the first improvement there is one turn in which the Kuski won't improve its best time.
4. Finally, on the third consecutive turn the Kuski plays the ongoing battle it will improve its best time up to 34.8 seconds, and won't improve any longee in future turns.

#### Level cards

Level cards are battled by Kuski cards to earn points. More on how battles are started and played on the next section.

Level subtypes
Levels have their own unique set of subtypes; these subtypes are called level types. The level types are: Across, Apple harvest, Flat track, Gravity, Hoyla, Internal, Labyrinth, Long cruise, Mirrored, Multi-route, Normal, Pipe, Puzzle, Remix, Roller coaster, Tricky, World cup.

Levels define the amount of full turns they can be played as a battle.

A full turn is equal to the number of players. In a two-player game a full turn is equal to two turns, one for each player.

A level defines it's possible battle length(s) at the bottom right of the card. This length(s) can be a number or a range between 1 and 6 full turns. 

When a level that defines a length range is added to the queue, the player that played that level card decides the length (between that range) that the battle will be started with. If the level defines a single number instead of a range, that's the length the battle it will be started with.


#### Battles (Kuski + Level cards)

A Kuski that is offline or online can add a level card to the queue during the active player's main phase.

A Kuski can have only one level on the queue at a time. If a battle is ongoing, the Kuski that added that level is allowed to add a new level to the queue.

Only online Kuskis that are not already playing a battle or after battle can enter an ongoing battle. By default, a Kuski cannot enter a battle on a level added by itself. Kuskis that enter a battle or after battle are still considered as online.

When a battle ends, the Kuskis that were playing that battle go into an after battle on the same level. At this point, the points for each Kuski are calculated and summed to the player's total points. 

A battle cannot be started if there was an ongoing battle at the beginning of the turn. As consequence, right after a battle has ended, if there is a new level card on the queue waiting to be started, it will wait one turn before being started as a new battle. 


## Game phases

Setup: Each player draws 7 cards.

#### 1. Battle times update
Active player's Kuskis that started this turn playing a level, update their personal record. This includes battles and after battles.

#### 2. After battle clean up
The active player puts his Kuskis that started this turn on the after battle area into his or her offline area.

If there are no more Kuskis in an ongoing after battle, the after battle ends and the level is discarded.

#### 3.1 Battle start
If there is no ongoing battle and there is at least one queued level, the first level on the queue is started as a battle.

#### 3.2 Battle end
If an ongoing battle has ended, the level goes into the after battle area and all Kuskis that were playing are put into that after battle.

#### 4. Draw
The active player draws one card. The player who goes first skips the draw step on their first turn to make up for the advantage of going first.

#### 5. Main phase
Play up to one Kuski and add as many levels to the queue as you want. 

If a level is added to the queue and there is no ongoing battle, plus one turn has passed since the last battle has ended (if there was any), the level is started as battle immediately.

You can put any number of Kuskis online that started this turn as offline.

If a battle is ongoing, any number of online Kuskis can enter the battle. When Kuskis enter a battle, their times are update immediately, if applicable.

#### 6. Clean up 
If you have more than seven cards in your hand, choose and discard cards until you have only seven.

## General 

#### Points system

After a battle ends, each Kuski gets one point per opponent's Kuskis they beat plus one, and plus one if the Kuski won the battle.

#### Effects

When a rule or effect allows or directs something to happen, and another effect states that it can't happen, the "can't" effect takes precedence.

Example: If one effect reads "You may play an additional Kuski this turn" and another reads "You can't play Kuskis this turn" the effect that precludes you from playing Kuskis wins.

export type Lang = 'en' | 'ar';

export interface Dict {
  // App / general
  appName: string;
  appTagline: string;
  coins: string;
  langToggle: string;

  // Setup
  players: string;
  fewerPlayers: string;
  morePlayers: string;
  setupBlurb: (coins: number) => string;
  startGame: string;

  // Round intro
  roundOf: (round: number, max: number) => string;
  roundResults: (round: number) => string;
  newRoundBegins: string;
  playersRemaining: (n: number) => string;
  requiredMinSavings: string;
  minSavingsExplain: string;
  splitAllCoins: string;
  savingsPooled: string;
  balancePrivate: string;
  beginPrivateTurns: string;

  // Handoff
  passDevice: string;
  imReady: (name: string) => string;
  handoffPrivateTurn: string;
  handoffStatement: string;
  handoffAccusation: string;
  noOneWatching: string;

  // Private turn
  compliant: string;
  belowMinimum: string;
  yourBalance: string;
  requiredMinSavingsShort: string;
  distributeCoins: string;
  allCoinsPlaced: string;
  savingsBox: string;
  savingsBoxSub: string;
  safetyBox: string;
  safetyBoxSub: string;
  zeroSavings: string;
  maxSavings: (n: number) => string;
  coinsIntoSavings: string;
  remainingToPlace: string;
  confirmDistribution: string;
  placeRemaining: (n: number) => string;
  invalidAmounts: string;

  // Private statement
  hidden: string;
  yourEyesOnly: string;
  privateStatementNote: string;
  revealStatement: string;
  startingBalance: string;
  savingsContribution: string;
  safetyContribution: string;
  savingsShare: string;
  newBalance: string;
  youMetMinimum: string;
  youDidNotMeet: string;
  hideAndPass: string;
  statementWillDisappear: string;

  // Public announcement
  publicResult: string;
  minWasReached: string;
  minWasNotReached: string;
  minReachedExplain: string;
  minNotReachedExplain: string;
  activePlayers: string;
  moveToDiscussion: string;

  // Discussion
  discussionPhase: string;
  talkItOut: string;
  putDeviceDown: string;
  discussClaim: string;
  makeAgreements: string;
  appNoRecord: string;
  whenReadyContinue: string;
  continueToAccusations: string;

  // Accusation
  accusationPhase: string;
  accusationCostLabel: string;
  accusationCostExplain: string;
  accuseQuestion: string;
  noAccusation: string;
  accusePlayer: string;
  chooseTarget: string;
  coinsToRisk: string;
  riskedAgainst: (name: string) => string;
  accusationRuleText: (name: string, cost: number, reward: number) => string;
  confirmAccusation: string;
  confirmNoAccusation: string;
  pickTargetAndRisk: string;
  cannotAffordAccusation: string;

  // Accusation result
  accusationsResolved: string;
  noOneAccused: string;
  noOneAccusedExplain: string;
  violationConfirmed: string;
  wrongAccusation: string;
  violationExplain: (name: string, reward: number) => string;
  violationExplainCapped: (name: string, reward: number) => string;
  wrongAccusationExplain: (name: string, cost: number) => string;
  ranOutEliminated: string;
  activePlayersRemaining: string;
  continue: string;

  // Round-end decision
  roundEndTitle: string;
  roundEndExplain: string;
  continueToNextRound: string;
  addPlayer: string;
  endGame: string;
  cannotAddMaxPlayers: string;

  // Two-player decision
  twoPlayersRemain: string;
  twoPlayersExplain: string;

  // Add player
  addPlayerTitle: string;
  addPlayerExplain: string;
  playerName: string;
  playerNamePlaceholder: (n: number) => string;
  addAndContinue: string;
  nameTaken: string;
  enterName: string;
  cancel: string;

  // Game over
  gameOver: string;
  finalResults: string;
  winner: string;
  survived: string;
  eliminatedInRound: (n: number) => string;
  onlyOneRemained: string;
  playAgain: string;

  // How to Play
  howToPlay: string;
  howToPlayTitle: string;
  howToPlayBack: string;
  howToPlayGoal: string;
  howToPlayGoalText: string;
  howToPlayStarting: string;
  howToPlayStartingText: string;
  howToPlayTwoBoxes: string;
  howToPlaySavingsLabel: string;
  howToPlaySavingsText: string;
  howToPlaySafetyLabel: string;
  howToPlaySafetyText: string;
  howToPlayDistributeText: string;
  howToPlayMinDeposit: string;
  howToPlayMinDepositText: string;
  howToPlayPrivateInfo: string;
  howToPlayPrivateInfoText: string;
  howToPlayAccusations: string;
  howToPlayAccusationsText: string;
  howToPlayCorrectAccusation: string;
  howToPlayCorrectAccusationText: string;
  howToPlayWrongAccusation: string;
  howToPlayWrongAccusationText: string;
  howToPlayCoinEconomy: string;
  howToPlayCoinEconomyText: string;
  howToPlayCoinEconomyNewPlayer: string;
  howToPlayElimination: string;
  howToPlayEliminationText: string;
  howToPlayAddingPlayers: string;
  howToPlayAddingPlayersText: string;
  howToPlayTwoPlayersRemain: string;
  howToPlayTwoPlayersRemainText: string;
  howToPlayWinning: string;
  howToPlayWinningText: string;

  // NEW label
  newLabel: string;
}

const en: Dict = {
  appName: 'The Two Boxes',
  appTagline: 'A pass-and-play social strategy game for 3–8 players, played on one device.',
  coins: 'coins',
  langToggle: 'EN | AR',

  players: 'Players',
  fewerPlayers: 'fewer players',
  morePlayers: 'more players',
  setupBlurb: (coins: number) =>
    `Each player starts with ${coins} coins. The game lasts 10 rounds. Each round, split your coins between Savings and Safety. Meet the minimum savings — or risk being accused.`,
  startGame: 'Start Game',

  roundOf: (round, max) => `Round ${round} of ${max}`,
  roundResults: (round) => `Round ${round} results`,
  newRoundBegins: 'A new round begins',
  playersRemaining: (n) => `${n} player${n === 1 ? '' : 's'} remaining.`,
  requiredMinSavings: 'Required Minimum Savings',
  minSavingsExplain: 'Each player must deposit at least this many coins into Savings to be compliant.',
  splitAllCoins: 'On your turn, split all your coins between Savings and Safety.',
  savingsPooled:
    'Savings are pooled and split equally. Safety stays with you. Depositing below the minimum means you can be accused.',
  balancePrivate: 'Your balance and choices stay private. Only you will see them.',
  beginPrivateTurns: 'Begin Private Turns',

  passDevice: 'Pass the device',
  imReady: (name) => `I'm ${name} — Continue`,
  handoffPrivateTurn: "It's your turn to distribute your coins between the two boxes. Make sure no one else is watching.",
  handoffStatement: 'Your private round statement is ready. Make sure no one else can see the screen.',
  handoffAccusation: 'Your accusation turn. Make sure no one else can see the screen.',
  noOneWatching: 'Make sure no one else can see the screen before continuing.',

  compliant: 'Compliant',
  belowMinimum: 'Below minimum',
  yourBalance: 'Your balance',
  requiredMinSavingsShort: 'Required minimum savings',
  distributeCoins: 'Distribute your coins',
  allCoinsPlaced: 'All coins must be placed. Nothing can be left over.',
  savingsBox: 'Savings',
  savingsBoxSub: 'Savings',
  safetyBox: 'Safety',
  safetyBoxSub: 'Safety',
  zeroSavings: '0 savings',
  maxSavings: (n) => `${n} savings`,
  coinsIntoSavings: 'coins into savings',
  remainingToPlace: 'Remaining to place',
  confirmDistribution: 'Confirm Distribution',
  placeRemaining: (n) => `Place all ${n} remaining coins to continue.`,
  invalidAmounts: 'Invalid amounts.',

  hidden: 'Hidden',
  yourEyesOnly: 'Your eyes only',
  privateStatementNote: 'This is your private statement. No one else should see it.',
  revealStatement: 'Reveal My Statement',
  startingBalance: 'Starting balance',
  savingsContribution: 'Savings',
  safetyContribution: 'Safety',
  savingsShare: 'Savings share returned',
  newBalance: 'New balance',
  youMetMinimum: 'You met the minimum',
  youDidNotMeet: 'You did NOT meet the minimum',
  hideAndPass: 'Hide & pass on',
  statementWillDisappear: 'This statement will disappear. The next player is waiting.',

  publicResult: 'Public Result',
  minWasReached: 'The required minimum WAS reached.',
  minWasNotReached: 'The required minimum was NOT reached.',
  minReachedExplain:
    'The group collectively met the savings threshold. Individual violations may still exist — discuss and accuse carefully.',
  minNotReachedExplain:
    'The group fell short of the savings threshold. At least one player deposited less than the minimum.',
  activePlayers: 'Active players',
  moveToDiscussion: 'Move to Discussion',

  discussionPhase: 'Discussion Phase',
  talkItOut: 'Talk it out',
  putDeviceDown: 'Put the device down and discuss openly.',
  discussClaim: 'Share what you claim happened — truth or lies.',
  makeAgreements: 'Make agreements, accusations, or defenses.',
  appNoRecord: 'The app does not record any of this.',
  whenReadyContinue: 'When the group is ready, continue to the accusation phase.',
  continueToAccusations: 'Continue to Accusations',

  accusationPhase: 'Accusation',
  accusationCostLabel: 'Accusation Cost',
  accusationCostExplain: 'Accusing costs this many coins. A correct accusation rewards you with double. A wrong accusation transfers your cost to the accused.',
  accuseQuestion: 'Do you want to accuse someone of violating the minimum savings?',
  noAccusation: 'No Accusation',
  accusePlayer: 'Accuse a player',
  chooseTarget: 'Choose a target',
  coinsToRisk: 'Cost to accuse',
  riskedAgainst: (name) => `accusing ${name}`,
  accusationRuleText: (name, cost, reward) =>
    `If ${name} actually deposited below the minimum, they are eliminated and you receive ${reward} coins from their balance. If they met the minimum, you lose ${cost} coins and they receive them.`,
  confirmAccusation: 'Confirm Accusation',
  confirmNoAccusation: 'Confirm: No Accusation',
  pickTargetAndRisk: 'Choose a target to accuse.',
  cannotAffordAccusation: 'You do not have enough coins to accuse.',

  accusationsResolved: 'Accusations Resolved',
  noOneAccused: 'No one was accused',
  noOneAccusedExplain: 'No accusations were made this round. Everyone keeps playing.',
  violationConfirmed: 'Violation Confirmed',
  wrongAccusation: 'Wrong Accusation',
  violationExplain: (name, reward) =>
    `${name} failed to meet the minimum deposit requirement and has been eliminated. Each successful accuser received ${reward} coins from ${name}'s balance. The remaining coins were distributed equally among all remaining active players.`,
  violationExplainCapped: (name, reward) =>
    `${name} failed to meet the minimum deposit requirement and has been eliminated. ${name}'s balance was insufficient to pay full rewards, so each successful accuser received ${reward} coins. The remaining coins were distributed equally among all remaining active players.`,
  wrongAccusationExplain: (name, cost) =>
    `${name} met the minimum deposit requirement. Each accuser paid ${cost} coins, which were transferred to ${name}.`,
  ranOutEliminated: 'ran out of coins and has been eliminated.',
  activePlayersRemaining: 'Active players remaining',
  continue: 'Continue',

  // Round-end decision
  roundEndTitle: 'Round Complete',
  roundEndExplain: 'The round has ended. You can add a new player before the next round, or continue directly.',
  continueToNextRound: 'Continue to Next Round',
  addPlayer: 'Add Player',
  endGame: 'End Game',
  cannotAddMaxPlayers: 'The maximum of 8 active players has been reached.',

  // Two-player decision
  twoPlayersRemain: 'Only 2 players remain.',
  twoPlayersExplain: 'The match can continue, or you can add a player before the next round.',

  addPlayerTitle: 'Add a Player',
  addPlayerExplain: 'The new player starts with 100 coins and joins from the next round.',
  playerName: 'Player name',
  playerNamePlaceholder: (n) => `Player ${n}`,
  addAndContinue: 'Add & Continue',
  nameTaken: 'This name was already used by an eliminated player in this match. Choose a different name.',
  enterName: 'Please enter a name.',
  cancel: 'Cancel',

  gameOver: 'Game Over',
  finalResults: 'Final Results',
  winner: 'Winner',
  survived: 'Survived',
  eliminatedInRound: (n) => `Eliminated in round ${n}`,
  onlyOneRemained: 'Only one player remained — the game ended early.',
  playAgain: 'Play Again',

  howToPlay: 'How to Play',
  howToPlayTitle: 'How to Play',
  howToPlayBack: 'Back',
  howToPlayGoal: 'The Goal',
  howToPlayGoalText:
    'Players try to survive the game and finish with the highest number of coins.',
  howToPlayStarting: 'Starting the Game',
  howToPlayStartingText: 'Each player starts with 100 coins.',
  howToPlayTwoBoxes: 'The Two Boxes',
  howToPlaySavingsLabel: 'Savings',
  howToPlaySavingsText:
    'Coins placed here are pooled with everyone else\'s savings and split equally among all active players at the end of the round.',
  howToPlaySafetyLabel: 'Safety',
  howToPlaySafetyText: 'Coins placed here stay with you and are returned to your balance.',
  howToPlayDistributeText:
    'Each round you distribute all of your coins between these two boxes according to the current Minimum Deposit requirement.',
  howToPlayMinDeposit: 'Minimum Deposit',
  howToPlayMinDepositText:
    'Every round has a randomly determined Minimum Deposit. Players must satisfy that requirement by placing the required amount of coins into the boxes.',
  howToPlayPrivateInfo: 'Private Information',
  howToPlayPrivateInfoText:
    'Players should keep their personal balances and deposits private. Other players do not automatically know exactly how many coins you have.',
  howToPlayAccusations: 'Accusations',
  howToPlayAccusationsText:
    'Players may accuse another player if they believe that player violated the round\'s Minimum Deposit requirement. Each round has an Accusation Cost, randomly determined between 10 and 30 coins, which changes every round.',
  howToPlayCorrectAccusation: 'Correct Accusation',
  howToPlayCorrectAccusationText:
    'If the accused player is confirmed guilty: the accuser receives 2 × the Accusation Cost, paid from the accused player\'s existing coins. The accused player is eliminated, and all coins remaining with them after the rewards are distributed equally among all remaining active players, including the successful accuser.',
  howToPlayWrongAccusation: 'Wrong Accusation',
  howToPlayWrongAccusationText:
    'If the accused player is confirmed innocent: the accuser loses the Accusation Cost, and those coins are transferred to the falsely accused player.',
  howToPlayCoinEconomy: 'Coin Economy',
  howToPlayCoinEconomyText:
    'Coins are never created or destroyed during normal game actions. Coins only move between players.',
  howToPlayCoinEconomyNewPlayer:
    'The only exception is when a new player joins the game: a newly added player enters with 100 coins, adding exactly 100 coins to the total economy of the current game.',
  howToPlayElimination: 'Elimination',
  howToPlayEliminationText:
    'A player who is successfully accused is eliminated and cannot rejoin the same game using the same name.',
  howToPlayAddingPlayers: 'Adding Players',
  howToPlayAddingPlayersText:
    'A new player can be added between rounds whenever there are fewer than 8 active players. A newly added player starts with 100 coins and begins playing from the next round.',
  howToPlayTwoPlayersRemain: 'Two Players Remaining',
  howToPlayTwoPlayersRemainText:
    'If only two active players remain after a round, the game pauses and the players can either add a player or end the game. If they add a player, the new player joins before the next round.',
  howToPlayWinning: 'Winning',
  howToPlayWinningText: 'If the game is ended, the player with the highest coin balance wins.',

  newLabel: 'NEW',
};

const ar: Dict = {
  appName: 'الصندوقان',
  appTagline: 'لعبة استراتيجية اجتماعية تمرير الجهاز من ٣ إلى ٨ لاعبين على جهاز واحد.',
  coins: 'عملة',
  langToggle: 'EN | AR',

  players: 'اللاعبون',
  fewerPlayers: 'لاعبون أقل',
  morePlayers: 'لاعبون أكثر',
  setupBlurb: (coins: number) =>
    `يبدأ كل لاعب بـ ${coins} عملة. تستمر اللعبة ١٠ جولات. في كل جولة، قسّم عملاتك بين الحصالة والأمان. التزم بالحد الأدنى للادخار — أو خاطر بالاتهام.`,
  startGame: 'ابدأ اللعبة',

  roundOf: (round, max) => `الجولة ${round} من ${max}`,
  newRoundBegins: 'تبدأ جولة جديدة',
  playersRemaining: (n) => `${n} لاعب${n === 1 ? '' : 'ون'} متبقّون.`,
  requiredMinSavings: 'الحد الأدنى المطلوب للادخار',
  minSavingsExplain: 'يجب على كل لاعب إيداع ما لا يقل عن هذا العدد من العملات في الحصالة ليكون ملتزمًا.',
  splitAllCoins: 'في دورك، قسّم كل عملاتك بين الحصالة والأمان.',
  savingsPooled:
    'تُجمّع الحصالة وتُقسّم بالتساوي. الأمان يبقى معك. الإيداع أقل من الحد الأدنى يعني أنك قد تُتّهم.',
  balancePrivate: 'رصيدك واختياراتك سرّية. أنت فقط من سيراها.',
  beginPrivateTurns: 'ابدأ الأدوار الخاصة',

  passDevice: 'مرّر الجهاز',
  imReady: (name) => `أنا ${name} — متابعة`,
  handoffPrivateTurn: 'حان دورك لتوزيع عملاتك بين الصندوقين. تأكّد أن لا أحد آخر يراقب.',
  handoffStatement: 'كشف حسابك الخاص للجولة جاهز. تأكّد أن لا أحد آخر يرى الشاشة.',
  handoffAccusation: 'دور الاتهام. تأكّد أن لا أحد آخر يرى الشاشة.',
  noOneWatching: 'تأكّد أن لا أحد آخر يرى الشاشة قبل المتابعة.',

  compliant: 'ملتزم',
  belowMinimum: 'أقل من الحد الأدنى',
  yourBalance: 'رصيدك',
  requiredMinSavingsShort: 'الحد الأدنى للادخار',
  distributeCoins: 'وزّع عملاتك',
  allCoinsPlaced: 'يجب وضع كل العملات. لا يمكن ترك أي عملة.',
  savingsBox: 'الحصالة',
  savingsBoxSub: 'الادخار',
  safetyBox: 'الأمان',
  safetyBoxSub: 'الأمان',
  zeroSavings: '٠ ادخار',
  maxSavings: (n) => `${n} ادخار`,
  coinsIntoSavings: 'عملة في الحصالة',
  remainingToPlace: 'المتبقي للوضع',
  confirmDistribution: 'تأكيد التوزيع',
  placeRemaining: (n) => `ضع كل ${n} عملة المتبقية للمتابعة.`,
  invalidAmounts: 'مبالغ غير صحيحة.',

  roundResults: (round) => `نتائج الجولة ${round}`,
  hidden: 'مخفي',
  yourEyesOnly: 'لعينيك فقط',
  privateStatementNote: 'هذا كشف حسابك الخاص. لا ينبغي لأحد آخر رؤيته.',
  revealStatement: 'اعرض كشفي',
  startingBalance: 'الرصيد الافتتاحي',
  savingsContribution: 'الحصالة',
  safetyContribution: 'الأمان',
  savingsShare: 'حصة الادخار المُعادة',
  newBalance: 'الرصيد الجديد',
  youMetMinimum: 'التزمت بالحد الأدنى',
  youDidNotMeet: 'لم تلتزم بالحد الأدنى',
  hideAndPass: 'إخفاء وتمرير',
  statementWillDisappear: 'سيختفي هذا الكشف. اللاعب التالي ينتظر.',

  publicResult: 'النتيجة العامة',
  minWasReached: 'تم بلوغ الحد الأدنى المطلوب.',
  minWasNotReached: 'لم يتم بلوغ الحد الأدنى المطلوب.',
  minReachedExplain:
    'بلغ المجموع الحد الأدنى للادخار مجتمعًا. قد تكون هناك مخالفات فردية — ناقشوا واتهموا بحذر.',
  minNotReachedExplain: 'لم يبلغ المجموع الحد الأدنى للادخار. لاعب واحد على الأقل أودع أقل من الحد الأدنى.',
  activePlayers: 'اللاعبون النشطون',
  moveToDiscussion: 'الانتقال إلى النقاش',

  discussionPhase: 'مرحلة النقاش',
  talkItOut: 'ناقشوا بحرية',
  putDeviceDown: 'ضعوا الجهاز وناقشوا علنًا.',
  discussClaim: 'شاركوا ما تدّعون أنه حدث — صدقًا أو كذبًا.',
  makeAgreements: 'اعقدوا اتفاقيات أو اتهامات أو دفاعًا.',
  appNoRecord: 'التطبيق لا يسجل أيًا من هذا.',
  whenReadyContinue: 'عندما يكون المجموع مستعدًا، انتقلوا إلى مرحلة الاتهام.',
  continueToAccusations: 'الانتقال إلى الاتهامات',

  accusationPhase: 'الاتهام',
  accusationCostLabel: 'تكلفة الاتهام',
  accusationCostExplain: 'تكلفة الاتهام هذا العدد من العملات. الاتهام الصحيح يكافئك بالضعف. الاتهام الخاطئ ينقل تكلفتك إلى المتهم.',
  accuseQuestion: 'هل تريد اتهام شخص بانتهاك الحد الأدنى للادخار؟',
  noAccusation: 'لا أتهم أحدًا',
  accusePlayer: 'اتهم لاعبًا',
  chooseTarget: 'اختر هدفًا',
  coinsToRisk: 'تكلفة الاتهام',
  riskedAgainst: (name) => `اتهام ${name}`,
  accusationRuleText: (name, cost, reward) =>
    `إذا أودع ${name} فعليًا أقل من الحد الأدنى، فسيتم استبعاده وتستلم ${reward} عملة من رصيده. إذا التزم بالحد الأدنى، تخسر ${cost} عملة وتنتقل إليه.`,
  confirmAccusation: 'تأكيد الاتهام',
  confirmNoAccusation: 'تأكيد: لا اتهام',
  pickTargetAndRisk: 'اختر هدفًا لاتهامه.',
  cannotAffordAccusation: 'لا تملك عملات كافية للاتهام.',

  accusationsResolved: 'تم البت في الاتهامات',
  noOneAccused: 'لم يتم اتهام أحد',
  noOneAccusedExplain: 'لم تُقدّم اتهامات في هذه الجولة. الجميع يكمل اللعب.',
  violationConfirmed: 'تم تأكيد المخالفة',
  wrongAccusation: 'اتهام خاطئ',
  violationExplain: (name, reward) =>
    `لم يلتزم ${name} بالحد الأدنى للإيداع وتم استبعاده. استلم كل متهم ناجح ${reward} عملة من رصيد ${name}. تم توزيع العملات المتبقية بالتساوي بين جميع اللاعبين النشطين المتبقين.`,
  violationExplainCapped: (name, reward) =>
    `لم يلتزم ${name} بالحد الأدنى للإيداع وتم استبعاده. كان رصيد ${name} غير كافٍ لدفع المكافآت كاملة، فاستلم كل متهم ناجح ${reward} عملة. تم توزيع العملات المتبقية بالتساوي بين جميع اللاعبين النشطين المتبقين.`,
  wrongAccusationExplain: (name, cost) =>
    `التزم ${name} بالحد الأدنى للإيداع. دفع كل متهم ${cost} عملة، وتم نقلها إلى ${name}.`,
  ranOutEliminated: 'نفدت عملاته وتم استبعاده.',
  activePlayersRemaining: 'اللاعبون النشطون المتبقون',
  continue: 'متابعة',

  // Round-end decision
  roundEndTitle: 'انتهت الجولة',
  roundEndExplain: 'انتهت الجولة. يمكنك إضافة لاعب جديد قبل الجولة التالية، أو المتابعة مباشرة.',
  continueToNextRound: 'المتابعة إلى الجولة التالية',
  addPlayer: 'إضافة لاعب',
  endGame: 'إنهاء اللعبة',
  cannotAddMaxPlayers: 'تم بلوغ الحد الأقصى وهو ٨ لاعبين نشطين.',

  // Two-player decision
  twoPlayersRemain: 'لم يتبقَّ سوى لاعبين.',
  twoPlayersExplain: 'يمكن متابعة المباراة، أو إضافة لاعب قبل الجولة التالية.',

  addPlayerTitle: 'إضافة لاعب',
  addPlayerExplain: 'يبدأ اللاعب الجديد بـ ١٠٠ عملة وينضم من الجولة التالية.',
  playerName: 'اسم اللاعب',
  playerNamePlaceholder: (n) => `لاعب ${n}`,
  addAndContinue: 'إضافة ومتابعة',
  nameTaken: 'تم استخدام هذا الاسم بالفعل من قبل لاعب مستبعد في هذه المباراة. اختر اسمًا مختلفًا.',
  enterName: 'يرجى إدخال اسم.',
  cancel: 'إلغاء',

  gameOver: 'انتهت اللعبة',
  finalResults: 'النتائج النهائية',
  winner: 'الفائز',
  survived: 'نجا',
  eliminatedInRound: (n) => `استبعد في الجولة ${n}`,
  onlyOneRemained: 'لم يتبقَّ سوى لاعب واحد — انتهت اللعبة مبكرًا.',
  playAgain: 'العب مجددًا',

  howToPlay: 'كيفية اللعب',
  howToPlayTitle: 'كيفية اللعب',
  howToPlayBack: 'رجوع',
  howToPlayGoal: 'الهدف',
  howToPlayGoalText: 'يحاول اللاعبون البقاء في اللعبة وإنهاؤها بأعلى عدد من العملات.',
  howToPlayStarting: 'بدء اللعبة',
  howToPlayStartingText: 'يبدأ كل لاعب بـ ١٠٠ عملة.',
  howToPlayTwoBoxes: 'الصندوقان',
  howToPlaySavingsLabel: 'الحصالة',
  howToPlaySavingsText:
    'تُجمّع العملات الموضوعة هنا مع حصالة بقية اللاعبين وتُقسّم بالتساوي بين جميع اللاعبين النشطين في نهاية الجولة.',
  howToPlaySafetyLabel: 'الأمان',
  howToPlaySafetyText: 'تبقى العملات الموضوعة هنا معك وتُعاد إلى رصيدك.',
  howToPlayDistributeText:
    'في كل جولة توزّع كل عملاتك بين هذين الصندوقين وفقًا لمتطلبات الحد الأدنى للإيداع الحالية.',
  howToPlayMinDeposit: 'الحد الأدنى للإيداع',
  howToPlayMinDepositText:
    'لكل جولة حد أدنى للإيداع يُحدَّد عشوائيًا. يجب على اللاعبين تلبية هذا المتطلب بوضع الكمية المطلوبة من العملات في الصندوقين.',
  howToPlayPrivateInfo: 'المعلومات الخاصة',
  howToPlayPrivateInfoText:
    'يجب على اللاعبين إبقاء أرصدتهم الشخصية وإيداعاتهم سرّية. لا يعرف بقية اللاعبين تلقائيًا عدد العملات التي يملكونها.',
  howToPlayAccusations: 'الاتهامات',
  howToPlayAccusationsText:
    'يجوز للاعبين اتهام لاعب آخر إذا اعتقدوا أنه انتهك متطلبات الحد الأدنى للإيداع في الجولة. لكل جولة تكلفة اتهام تُحدَّد عشوائيًا بين ١٠ و٣٠ عملة، وتتغير في كل جولة.',
  howToPlayCorrectAccusation: 'الاتهام الصحيح',
  howToPlayCorrectAccusationText:
    'إذا تبيّن أن اللاعب المتهم مذنب: يستلم المتهم ٢ × تكلفة الاتهام، تُدفع من عملات اللاعب المتهم الموجودة. يُستبعد اللاعب المتهم، وتُوزّع كل العملات المتبقية معه بعد المكافآت بالتساوي بين جميع اللاعبين النشطين المتبقين، بمن فيهم المتهم الناجح.',
  howToPlayWrongAccusation: 'الاتهام الخاطئ',
  howToPlayWrongAccusationText:
    'إذا تبيّن أن اللاعب المتهم بريء: يخسر المتهم تكلفة الاتهام، وتُنقل تلك العملات إلى اللاعب المتهم زورًا.',
  howToPlayCoinEconomy: 'اقتصاد العملات',
  howToPlayCoinEconomyText:
    'لا تُخلق العملات ولا تُتلف أثناء الإجراءات العادية للعبة. تنتقل العملات بين اللاعبين فقط.',
  howToPlayCoinEconomyNewPlayer:
    'الاستثناء الوحيد هو عند انضمام لاعب جديد: يدخل اللاعب المضاف حديثًا بـ ١٠٠ عملة، مما يضيف ١٠٠ عملة بالضبط إلى الاقتصاد الكلي للعبة الحالية.',
  howToPlayElimination: 'الاستبعاد',
  howToPlayEliminationText:
    'اللاعب الذي يُتّهم بنجاح يُستبعد ولا يمكنه إعادة الانضمام إلى نفس اللعبة باستخدام نفس الاسم.',
  howToPlayAddingPlayers: 'إضافة اللاعبين',
  howToPlayAddingPlayersText:
    'يمكن إضافة لاعب جديد بين الجولات عندما يكون عدد اللاعبين النشطين أقل من ٨. يبدأ اللاعب المضاف حديثًا بـ ١٠٠ عملة ويبدأ اللعب من الجولة التالية.',
  howToPlayTwoPlayersRemain: 'بقاء لاعبين اثنين',
  howToPlayTwoPlayersRemainText:
    'إذا لم يتبقَّ سوى لاعبين نشطين بعد جولة، تتوقف اللعبة ويمكن للاعبين إما إضافة لاعب أو إنهاء اللعبة. إذا أضافوا لاعبًا، ينضم اللاعب الجديد قبل الجولة التالية.',
  howToPlayWinning: 'الفوز',
  howToPlayWinningText: 'إذا أُنهيت اللعبة، يفوز اللاعب صاحب أعلى رصيد من العملات.',

  newLabel: 'جديد',
};

export const translations: Record<Lang, Dict> = { en, ar };

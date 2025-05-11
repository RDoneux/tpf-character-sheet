export const TransactionDirection = {
    CAMP_TO_PLAYER: 'arrow_left_alt',
    PLAYER_TO_CAMP: 'arrow_right_alt',
}
export type TransactionDirection = (typeof TransactionDirection)[keyof typeof TransactionDirection]

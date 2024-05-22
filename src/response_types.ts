import { ERC20Token, OrderStatus, TradedPair } from "@/request_types.ts";
import { Address } from "@/types.ts";

/**
 * Represents the result of an operation.
 */
export interface Result<T> {
  result?: T; // The result of the operation, omitted if operation failed
  code?: number; // The status code of the operation, might be omitted in case of successful operation
  error?: string; // The error message, if any, human-readable
  exception?: Error; // The exception, if any
}

/**
 * Represents a level in the order book.
 */
export interface TableLevel {
  price: bigint; // The price of the level in raw format
  volume: bigint; // The volume at this level, in quote asset.
  orders: number; // The number of orders at this level.
}

/**
 * Represents the Best Bid and Offer (BBO).
 */
export interface BBO {
  bid?: TableLevel | null; // The best bid level.
  ask?: TableLevel | null; // The best ask level.
  ts: number; // The timestamp when the BBO was sent.
}

/**
 * Represents the order book table.
 */
export interface Table {
  bids: [bigint, bigint, number][]; // Array of bid levels [price, volume, orders].
  asks: [bigint, bigint, number][]; // Array of ask levels [price, volume, orders].
}

/**
 * Represents a snapshot of the order book.
 */
export interface Snapshot {
  levels: Table; // The levels of the order book.
  msg_id: string; // The message ID of the snapshot.
  time: number; // The timestamp when the snapshot was taken.
}

/**
 * Represents an update to the order book table.
 */
export interface TableUpdate extends Table {
  msg_id: bigint; // The message ID of the update.
  time: number; // The timestamp when the update was received.
}

/**
 * Represents a user's balance of an ERC20 token.
 */
interface Balance {
  token: ERC20Token; // The ERC20 token.
  balance: bigint; // The available balance of the token on exchange.
  locked: bigint; // The locked or reserved balance of the token exchange.
}

export type FeeTuple = [number, number]; // Array of maker and taker fees in percentage basis points.

/**
 * Represents a user's trading fee for a specific traded pair.
 */
interface UserFee extends TradedPair {
  fee: FeeTuple[]; // Array of maker and taker fees in percentage basis points.
}

/**
 * Represents user information including balances and fees on exchange.
 */
export interface UserInfo {
  nonce: number; // The nonce value for the user.
  balances: Balance[]; // Array of token balances held by the user.
  fees: UserFee[]; // Array of trading fees applicable to the user.
}

/**
 * Represents an execution report for an order.
 */
export interface ExecutionReport {
  client: Address; // maker of order
  pair: TradedPair; // The traded pair associated with the execution.
  fill_price: bigint; // The price at which the order was filled.
  fill_base_qty: bigint; // The filled quantity in the base token.
  fill_quote_qty: bigint; // The filled quantity in the quote token.
  acc_base_qty: bigint; // The accumulated filled quantity in the base token.
  acc_quote_qty: bigint; // The accumulated filled quantity in the quote token.
  hash: string; // The order hash.
  is_sell_side: boolean; // Indicates whether the order was on the sell side.
  status: OrderStatus; // The status of the order.
}

/**
 * Represents a trade.
 */
export interface Trade {
  price: bigint; // The price at which the trade occurred.
  base_qty: bigint; // The quantity of the base currency involved in the trade.
  quote_qty: bigint; // The quantity of the quote currency involved in the trade.
  is_sell_side: boolean; // Indicates whether the trade was on the sell side.
  time: number; // The timestamp when the trade occurred.
}

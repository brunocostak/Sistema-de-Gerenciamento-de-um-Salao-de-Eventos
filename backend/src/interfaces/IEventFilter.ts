export default interface IEventFilter {
  name?: string;
  date?: string;
  locationId?: number;
  userId?: number;
  type?: string;
  closed?: boolean;
}


export type Message = {
  id: number,
  createddate: String,
  exactlocation: String,
  title: String,
  description: String,
  latitude: number,
  longitude: number,
  category: number,
  subcategory: String,
}

export interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  items(): T[];
  size(): number
}


export class Queue<T> implements IQueue<T> {
  private storage: T[] = [];

  constructor(private capacity: number = Infinity) { }

  dequeue(): T | undefined {
    return this.storage.shift()
  }

  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      this.storage.pop();
    }

    this.storage.push(item)
  }

  size(): number {
    return this.storage.length
  }

  items(): T[] {
    return this.storage
  }
}

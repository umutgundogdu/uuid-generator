export class HistoryItem {
    uuid: string;
    timestamp: number;
  
    constructor(uuid: string, timestamp: number) {
      this.uuid = uuid;
      this.timestamp = timestamp;
    }
  
    getDateString(): string {
        return new Date(this.timestamp).toDateString();
    }

    serialize() {
      return {
        uuid: this.uuid,
        timestamp: this.timestamp,
      };
    }
  }
  
  export const appendHistory = (historyItem: HistoryItem) => {
    loadHistory((history) => {
      saveHistory([historyItem, ...history]);
    })
  };
  
  export const saveHistory = (history: HistoryItem[]) => {
    const serialized = [];
    for (const item of history) {
      serialized.push(item.serialize());
    }
    chrome.storage.sync.set({"history": serialized});
  };
  
  export const loadHistory = (onLoad: (history:  HistoryItem[]) => void):void => {
    chrome.storage.sync.get(["history"], (result) => {
      if(result){
        const serialized = result["history"];
      const history: HistoryItem[] = [];
      if (serialized) {
        for (const ser of serialized) {
          history.push(new HistoryItem(ser["uuid"], ser["timestamp"]));
        }
      }
      onLoad(history.sort((item1, item2) => item2.timestamp - item1.timestamp));
      }
    });
  };
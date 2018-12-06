const initialItems = [
  {
    id: 0,
    name: "Milk",
  },
  {
    id: 1,
    name: "Eggs",
  },
];
const responseDelay = 1200;
let items;
let idCount;

const getIdCount = (items) => {
  if (items.length > 0) {
    return items.reduce((acc, cur) => Math.max(acc.id, cur.id)) + 1;
  } else {
    return 0;
  }
};

const initialize = () => {
  items = localStorage.getItem('items');
  if (!items) {
    items = initialItems;
  } else {
    items = JSON.parse(items);
  }
  idCount = getIdCount(items);
};

const wait = (time) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

initialize();

const api = {
  fetchItems: async () => {
    await wait(responseDelay);
    return items;
  },
  addItem: async function ({name}) {
    await wait(responseDelay);
    items.push({
      name,
      id: idCount++,
    });
    this.persistItems();
    return items;
  },
  removeItem: async function ({id}) {
    await wait(responseDelay);
    items = items.filter(item => id !== item.id);
    this.persistItems();
    return items;
  },
  persistItems: () => {
    localStorage.setItem('items', JSON.stringify(items));
  }
};

export default api;

const responseDelay = 1200;
let items = [
  {
    id: 0,
    name: "Milk",
  },
  {
    id: 1,
    name: "Eggs",
  },
];
let idCount = 2;

const wait = (time) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

const api = {
  fetchItems: async () => {
    await wait(responseDelay);
    return items;
  },
  addItem: async ({name}) => {
    await wait(responseDelay);
    items.push({
      name,
      id: idCount++,
    });
    return items;
  },
  removeItem: async ({id}) => {
    await wait(responseDelay);
    items = items.filter(item => id !== item.id);
    return items;
  },
};

export default api;

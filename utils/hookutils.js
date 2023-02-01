export function flattenItems(items) {
  const result = [];
  items.forEach((item) => {
    if (item.childs) {
      result.push(...item.childs);
      delete item.childs;
      result.push(item);
    } else {
      result.push(item);
    }
  });
  return result.filter((item) => item?.order !== -1); // Filter "duplicates" for onboarding personalisation
}

export function addParentToChilds(items, parentId) {
  let currentParentId = parentId ?? null;

  return items.map((item) => {
    if (item.childs) {
      currentParentId = item.id;
      addParentToChilds(item.childs, currentParentId);
      return item;
    } else {
      item.parent = currentParentId;
      return item;
    }
  });
}

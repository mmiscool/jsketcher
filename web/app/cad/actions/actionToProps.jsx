
export default function(ref, actions) {
  let id, override;
  if (Array.isArray(ref)) {
    [id, override] = ref;
  } else {
    id = ref;
  }
  let action = actions[id];
  if (!action) {
    return null;
  }
  return Object.assign({}, action, override);
}
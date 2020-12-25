// @ts-ignore
import matchAll from 'string.prototype.matchall';

matchAll.shim();

export default function matchInputs(text) {
  const matches = text.matchAll(/\$[\w\d]+/gm);
  const result = Array.from(matches).map((value) => ({
    input: value[0] || '',
    index: value.index || 0,
    lastIndex: (value.index || 0) + (value[0]?.length || 0),
  }));
  return result;
}

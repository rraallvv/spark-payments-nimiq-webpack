
import {writable} from 'svelte/store';

export let settings;

export function createSettings(params) {
  settings = writable(params);
  return settings;
};

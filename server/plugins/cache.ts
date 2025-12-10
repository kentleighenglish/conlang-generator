import path from "path";
import Cache from "file-system-cache";
import type { FileSystemCache } from "file-system-cache";

const caches: Record<string, FileSystemCache> = {};

export const createCache = (name: string) => {
	caches[name] = Cache({
		basePath: path.resolve("./.cache"),
		ns: name
	});
}

export const getCache = (name: string) => {
	if (caches[name]) {
		return caches[name];
	}

	throw new Error(`Cache not found ${name}`);
}

export const get = async (cacheName: string, key: string) => {
	return await getCache(cacheName).get(key);
}

export const set = async (cacheName: string, key: string, val: number | string | object) => {
	return await getCache(cacheName).set(key, val);
}

export const del = async (cacheName: string, key: string) => {
	return await getCache(cacheName).remove(key);
}

export const clear = async (cacheName: string) => {
	console.log("clearing cache: ", cacheName);
	return await getCache(cacheName).clear();
}

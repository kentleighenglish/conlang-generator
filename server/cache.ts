import path from "path";
import Cache from "file-system-cache";

const caches = {};

export const createCache = (name) => {
	caches[name] = Cache({
		basePath: path.resolve("./.cache"),
		ns: name
	});
}

export const getCache = (name) => {
	if (caches[name]) {
		return caches[name];
	}

	throw new Error(`Cache not found ${name}`);
}

export const get = async (cacheName, key) => {
	return await getCache(cacheName).get(key);
}

export const set = async (cacheName, key, val) => {
	return await getCache(cacheName).set(key, val);
}

export const del = async (cacheName, key) => {
	return await getCache(cacheName).remove(key);
}

export const clear = async (cacheName) => {
	console.log("clearing cache: ", cacheName);
	return await getCache(cacheName).clear();
}

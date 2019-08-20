import { device } from 'tabris';

export interface Resource<T> {
  value: T;
  android?: T;
  ios?: T;
}

export function resolve<T>(resource: Resource<T>): T {
  const platform = device.platform.toLocaleLowerCase();
  // @ts-ignore
  return platform in resource ? resource[platform] : resource.value;
}

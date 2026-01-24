import type { EnumProviderTypes } from "@prisma/client";

export interface LocationInfo {
  country: string;
  city: string;
  latidute: number;
  longitude: number;
}

export interface DeviceInfo {
  browser: string;
  os: string;
  type: string;
}

export interface SessionMetadata {
  location: LocationInfo;
  device: DeviceInfo;
  method: EnumProviderTypes;
  ip: string;
}

export interface ISession {
  id: string;
  userId: string;
  createdAt: string;
  metadata: SessionMetadata;
}

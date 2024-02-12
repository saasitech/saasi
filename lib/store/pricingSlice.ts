"use client";
import { StateCreator } from "zustand";
import {
  BillingPeriod,
  PriceRecurring,
  Pricing,
  TierFeature,
  TierItem,
} from "../types";
import { slugify } from "../utils";

export const defaultTheme = "dim";

export const priceDefault: PriceRecurring = {
  value: 0,
  billingCycle: 1,
  billingPeriod: "month",
};
export const tiers: TierItem[] = [
  {
    id: 0,
    title: "Basic",
    badge: "",
    description: "For small teams or office",
    price: [
      {
        value: 19.99,
        billingCycle: 1,
        billingPeriod: "month",
      },
      { value: 199, billingCycle: 1, billingPeriod: "year" },
    ],
    priceType: "recurring",
    features: [
      { id: 0, name: "Basic feature", included: true },
      { id: 1, name: "Pro feature", included: false },
      { id: 2, name: "Premium feature", included: false },
    ],
    terms: "",
    buttons: [{ type: "link", name: "Choose plan", href: "/#" }],
  },
  {
    id: 1,
    title: "Pro",
    badge: "Popular",
    description: "For professional teams",
    price: [
      {
        value: 19,
        billingCycle: 1,
        billingPeriod: "month",
      },
      { value: 199, billingCycle: 1, billingPeriod: "year" },
    ],
    priceType: "recurring",
    features: [
      { id: 0, name: "Basic feature", included: true },
      { id: 1, name: "Pro feature", included: true },
      { id: 2, name: "Premium feature", included: false },
    ],
    terms: "",
    buttons: [{ type: "link", name: "Choose plan", href: "/#" }],
  },
  {
    id: 2,
    title: "Enterprise",
    badge: "",
    description: "For enterprise business",
    price: "Contact us",
    priceType: "plain text",
    showPriceAsText: true,
    features: [
      { id: 0, name: "Basic feature", included: true },
      { id: 1, name: "Pro feature", included: true },
      { id: 2, name: "Premium feature", included: true },
    ],
    terms: "",
    buttons: [{ type: "link", name: "Choose plan", href: "/#" }],
  },
];
export const tierDefault: TierItem = tiers[0];
export const featuresDefault: TierFeature[] = tierDefault.features;

export const defaultPricingState: Pricing = {
  id: 0,
  title: "New Pricing",
  slug: "new",
  description: `Sample Pricing description`,
  currency: "USD",
  theme: defaultTheme,
  metadata: {},
  billingOptions: {
    show: true,
    selected: "month",
    labels: {
      week: "Weekly",
      month: "Monthly",
      year: "Yearly",
    },
  },
  tiers,
  termsUrl: "https://saasi.vercel.app/terms",
  createdAt: new Date(),
  updatedAt: null,
  archivedAt: null,
};

export interface PricingSlice extends Pricing {
  setDescription: (val: string) => void;
  setSlug: (val: string) => void;
  setTitle: (val: string) => void;
  setTermsUrl: (val: string) => void;
  setShowBillingPeriod: (val: boolean) => void;
  setBillingOptionLabel: (key: BillingPeriod, val: string) => void;
  setBillingPeriod: (val: BillingPeriod) => void;
  setCurrency: (val: string) => void;
  setTheme: (val: string) => void;
  setTiers: (val: TierItem[]) => void;
  setPricing: (val: Pricing) => void;
}

export const createPricingSlice: StateCreator<
  PricingSlice,
  [],
  [],
  PricingSlice
> = (set) => ({
  ...defaultPricingState,
  setSlug: (val) => {
    set((state) => ({ slug: slugify(val || state.title) }));
  },
  setTitle: (val) => set({ title: val }),
  setTermsUrl: (val) => set({ termsUrl: val }),
  setDescription: (val) => set({ description: val }),
  setTheme: (val) => set({ theme: val }),
  setCurrency: (val) => set({ currency: val }),
  setShowBillingPeriod: (val) =>
    set((state) => ({
      billingOptions: { ...state.billingOptions, show: val },
    })),
  setBillingPeriod: (val) =>
    set((state) => ({
      billingOptions: { ...state.billingOptions, selected: val },
    })),
  setBillingOptionLabel: (key, value) =>
    set((state) => ({
      billingOptions: {
        ...state.billingOptions,
        labels: { ...state.billingOptions.labels, [key]: value },
      },
    })),
  setTiers: (newTiers) => {
    set({
      tiers: newTiers.map((t, index) => ({
        ...t,
        id: index,
        features: t.features.map((i, index) => ({ ...i, id: index })),
      })),
    });
  },
  setPricing: (newPricing) => {
    set((state) => ({ ...state, ...newPricing }));
  },
});
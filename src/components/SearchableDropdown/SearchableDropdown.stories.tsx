import type { Meta, StoryObj } from "@storybook/react";

import SearchableDropdown from "./SearchableDropdown";

const meta = {
  component: SearchableDropdown,
} satisfies Meta<typeof SearchableDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const fruits = [
  {
    label: "Apple",
    value: "apple",
  },
  {
    label: "Banana",
    value: "banana",
  },
  {
    label: "Cherry",
    value: "cherry",
  },
  {
    label: "Date",
    value: "date",
  },
  {
    label: "Elderberry",
    value: "elderberry",
  },
  {
    label: "Fig",
    value: "fig",
  },
  {
    label: "Grape",
    value: "grape",
  },
  {
    label: "Honeydew",
    value: "honeydew",
  },
  {
    label: "Indian Fig",
    value: "indian_fig",
  },
  {
    label: "Jackfruit",
    value: "jackfruit",
  },
  {
    label: "Kiwi",
    value: "kiwi",
  },
  {
    label: "Lemon",
    value: "lemon",
  },
  {
    label: "Mango",
    value: "mango",
  },
  {
    label: "Nectarine",
    value: "nectarine",
  },
  {
    label: "Orange",
    value: "orange",
  },
  {
    label: "Papaya",
    value: "papaya",
  },
  {
    label: "Quince",
    value: "quince",
  },
  {
    label: "Raspberry",
    value: "raspberry",
  },
  {
    label: "Strawberry",
    value: "strawberry",
  },
  {
    label: "Tangerine",
    value: "tangerine",
  },
  {
    label: "Ugli Fruit",
    value: "ugli_fruit",
  },
  {
    label: "Vanilla",
    value: "vanilla",
  },
  {
    label: "Watermelon",
    value: "watermelon",
  },
  {
    label: "Xigua",
    value: "xigua",
  },
  {
    label: "Yellow Passion Fruit",
    value: "yellow_passion_fruit",
  },
  {
    label: "Zucchini",
    value: "zucchini",
  },
  {
    label: "Apricot",
    value: "apricot",
  },
  {
    label: "Blackberry",
    value: "blackberry",
  },
  {
    label: "Cantaloupe",
    value: "cantaloupe",
  },
  {
    label: "Dragonfruit",
    value: "dragonfruit",
  },
  {
    label: "Elderberry",
    value: "elderberry",
  },
  {
    label: "Feijoa",
    value: "feijoa",
  },
  {
    label: "Grapefruit",
    value: "grapefruit",
  },
  {
    label: "Huckleberry",
    value: "huckleberry",
  },
  {
    label: "Imbe",
    value: "imbe",
  },
  {
    label: "Jujube",
    value: "jujube",
  },
  {
    label: "Kumquat",
    value: "kumquat",
  },
  {
    label: "Lime",
    value: "lime",
  },
  {
    label: "Mulberry",
    value: "mulberry",
  },
  {
    label: "Nance",
    value: "nance",
  },
  {
    label: "Olive",
    value: "olive",
  },
  {
    label: "Peach",
    value: "peach",
  },
  {
    label: "Rambutan",
    value: "rambutan",
  },
  {
    label: "Soursop",
    value: "soursop",
  },
  {
    label: "Tomato",
    value: "tomato",
  },
  {
    label: "Uva",
    value: "uva",
  },
  {
    label: "Voavanga",
    value: "voavanga",
  },
  {
    label: "Wolfberry",
    value: "wolfberry",
  },
  {
    label: "Yuzu",
    value: "yuzu",
  },
  {
    label: "Ziziphus",
    value: "ziziphus",
  },
];

export const Default: Story = {
  args: {
    label: "Fruit",
    options: fruits,
    usePortal: true,
    multiple: true,
    searchable: true,
  },
};

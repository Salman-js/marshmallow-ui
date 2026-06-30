# Marshmallow UI — Components

Drop-in source in `templates/components/`. Import text/layout primitives from
`@/tw`; import these from `@/components/ds`.

## AppText — `app-text.tsx`

Typed text with the rounded type scale. **Use this for all copy.**

```tsx
<AppText variant="display">Settings</AppText>
<AppText variant="cardTitle">Appearance</AppText>
<AppText variant="subtitle">Choose how the app looks</AppText>
<AppText variant="body" tint={colors.danger}>Delete</AppText>
```

Props: `variant` (`display | title | cardTitle | body | subtitle | label |
caption`), `color` (theme token name), `tint` (raw hex, wins over `color`), plus
RN `Text` props (`numberOfLines`, `style`, …).

## Card — `card.tsx`

The base elevated surface with the **chunky offset shadow**. Tappable when
`onPress` is set.

```tsx
<Card>{children}</Card>                 {/* elevated white, chunky shadow */}
<Card inset>{children}</Card>           {/* flat recessed cream, no shadow */}
<Card flush>{customPaddedContent}</Card>{/* no inner padding */}
<Card onPress={open}>{children}</Card>  {/* PressableScale wrapped */}
```

Props: `inset`, `flush`, `onPress`, `accessibilityLabel`, `className`, `style`.

## IconBadge — `icon-badge.tsx`

Vibrant squircle chip + white glyph + top gloss. The signature accent element.

```tsx
<IconBadge color="purple" icon="moon" />
<IconBadge color="orange" materialIcon="fire" size={56} />
<IconBadge fill="#FF8800" icon="star" />        {/* raw fill */}
```

Props: `color` (badge palette name, default `green`), `fill` (raw, wins),
`icon` (Ionicons), `materialIcon` (MaterialCommunityIcons), `size` (default 44),
`glyphColor` (default white), `children`.

## IconButton — `icon-button.tsx`

Tappable icon in a squircle/circle. Spring press + haptic.

```tsx
<IconButton icon="close" accessibilityLabel="Close" variant="soft" />
<IconButton icon="add" accessibilityLabel="Add" variant="accent" round />
<IconButton icon="trash" accessibilityLabel="Delete" variant="danger" />
```

Props: `variant` (`soft | plain | accent | danger`), `size` (48), `iconSize`,
`round`, `disabled`, `haptic`, `tint`, `icon`/`materialIcon`, `onPress`,
`accessibilityLabel` (required).

## ChunkyButton — `chunky-button.tsx`

The primary labelled button: chunky offset shadow, gloss + sheen, press depresses
into the shadow. Supports color variants and a compact size. (See file for full
prop list — `label`, `onPress`, `variant`, `compact`, `icon`, `loading`,
`fullWidth`, `disabled`.)

```tsx
<ChunkyButton label="Find this shade" onPress={hunt} />
<ChunkyButton label="Skip" variant="neutral" compact />
```

## SegmentedControl — `segmented-control.tsx`

Discrete labelled toggle. Active option = tinted green pill + green border +
bold green label; inactive = flat cream + muted text. Haptic on change.

```tsx
const [tab, setTab] = useState<"feed" | "trending">("feed");
<SegmentedControl
  value={tab}
  onChange={setTab}
  options={[
    { value: "feed", label: "Color Feed", icon: "color-palette" },
    { value: "trending", label: "Trending", icon: "trending-up" },
  ]}
/>
```

Props: `options` (`{ value, label, icon? }[]`), `value`, `onChange`, `haptic`.

## AppSwitch — `app-switch.tsx`

System `Switch` with iOS-blue active track that respects theme off-track.

```tsx
<AppSwitch value={on} onValueChange={setOn} accessibilityLabel="Notifications" />
```

Props: `value`, `onValueChange`, `disabled`, `accessibilityLabel`, `tint`.

## ListRow — `list-row.tsx`

The atomic row: leading icon badge + title/subtitle + trailing control. Used for
settings, data sources, menus.

```tsx
<ListRow icon="notifications" badgeColor="orange" title="Notifications"
  subtitle="Daily reminders" trailing={<AppSwitch value={on} onValueChange={setOn} />} />
<ListRow icon="person" title="Account" chevron onPress={open} />
<ListRow icon="trash" title="Delete account" destructive onPress={confirm} />
```

Props: `icon`/`materialIcon`, `badgeColor`, `leading` (custom node), `title`,
`subtitle`, `trailing`, `chevron`, `onPress`, `destructive`, `disabled`.

## SettingCard — `setting-card.tsx`

A `Card` wrapping a `ListRow`, with optional body content below (e.g. a segmented
control). The building block of settings screens.

```tsx
<SettingCard icon="moon" badgeColor="indigo" title="Appearance"
  subtitle="Light, dark, or system">
  <SegmentedControl value={theme} onChange={setTheme} options={themeOptions} />
</SettingCard>
```

Props: ListRow props + `children` (body content).

## Section — `section.tsx`

A titled group of cards. `large` = big display heading + description; otherwise a
small uppercase label.

```tsx
<Section title="Appearance" large description="Customize the look.">
  <SettingCard … />
  <SettingCard … />
</Section>

<Section title="DATA SOURCES">
  <SettingCard … />
</Section>
```

Props: `title`, `description`, `large`, `gap`, `children`.

## OutlineButton — `outline-button.tsx`

Low-emphasis dashed/solid outlined pill for "Add …" affordances.

```tsx
<OutlineButton label="Add data source" icon="add" onPress={add} />
<OutlineButton label="New" dashed={false} fullWidth onPress={create} />
```

Props: `label`, `icon`, `onPress`, `dashed` (default true), `fullWidth`, `disabled`.

## Gloss — `gloss.tsx` (helper)

`GlossOverlay` (static top highlight) and `Sheen` (animated diagonal sweep, respects
reduced-motion). Drop as the **last child** of a rounded `overflow-hidden` colored
surface. Used inside `IconBadge` and `ChunkyButton`.

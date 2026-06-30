# Marshmallow UI — Screen Recipes

Copy-paste patterns. All assume primitives from `@/tw` and `@/components/ds`.

## Screen scaffold

Cream canvas + scroll + safe padding.

```tsx
import { ScrollView, View } from "@/tw";
import { useThemeColors } from "@/hooks/use-theme-colors";

function Screen({ children }: { children: React.ReactNode }) {
  const colors = useThemeColors();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 96, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}
```

## Settings screen

The canonical layout: sections of setting cards.

```tsx
<Screen>
  <AppText variant="display">Settings</AppText>

  <Section title="Appearance" large description="Customize how the app looks.">
    <SettingCard icon="moon" badgeColor="indigo" title="Theme"
      subtitle="Light, dark, or system">
      <SegmentedControl value={theme} onChange={setTheme} options={[
        { value: "light", label: "Light", icon: "sunny" },
        { value: "dark", label: "Dark", icon: "moon" },
        { value: "system", label: "System", icon: "phone-portrait" },
      ]} />
    </SettingCard>
    <SettingCard icon="notifications" badgeColor="orange" title="Notifications"
      subtitle="Daily reminders"
      trailing={<AppSwitch value={notif} onValueChange={setNotif} />} />
  </Section>

  <Section title="ACCOUNT">
    <SettingCard icon="person" badgeColor="blue" title="Profile" chevron onPress={editProfile} />
    <SettingCard icon="log-out" title="Sign out" destructive onPress={signOut} />
  </Section>
</Screen>
```

## List with header + add affordance

```tsx
<Section title="Data sources" large>
  {sources.map((s) => (
    <SettingCard key={s.id} icon={s.icon} badgeColor={s.color}
      title={s.name} subtitle={s.detail} chevron onPress={() => open(s.id)} />
  ))}
  <OutlineButton label="Add data source" icon="add" fullWidth onPress={add} />
</Section>
```

## Empty state

Centered icon badge + title + subtitle + primary button.

```tsx
<View style={{ alignItems: "center", gap: 16, paddingVertical: 48 }}>
  <IconBadge color="purple" icon="sparkles" size={72} />
  <View style={{ alignItems: "center", gap: 4 }}>
    <AppText variant="title">Nothing here yet</AppText>
    <AppText variant="subtitle" style={{ textAlign: "center" }}>
      Capture your first shade to start a streak.
    </AppText>
  </View>
  <ChunkyButton label="Get started" onPress={start} />
</View>
```

## Hero card (today's content)

Elevated card with a badge header and a primary CTA.

```tsx
<Card>
  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
    <IconBadge color="teal" icon="color-palette" />
    <View style={{ flex: 1 }}>
      <AppText variant="label">TODAY'S SHADE</AppText>
      <AppText variant="cardTitle">Seafoam</AppText>
    </View>
  </View>
  <View style={{ height: 120, borderRadius: 16, backgroundColor: "#21C4B0", marginTop: 16 }} />
  <View style={{ marginTop: 16 }}>
    <ChunkyButton label="Find this shade" fullWidth onPress={hunt} />
  </View>
</Card>
```

## Segmented toggle driving content

```tsx
const [tab, setTab] = useState<"feed" | "trending">("feed");
<>
  <SegmentedControl value={tab} onChange={setTab} options={[
    { value: "feed", label: "Color Feed", icon: "color-palette" },
    { value: "trending", label: "Trending", icon: "trending-up" },
  ]} />
  {tab === "feed" ? <Feed /> : <Trending />}
</>
```

## Press-feedback pattern (custom surface)

If you build a bespoke pressable surface, match the system: scale down on press,
pop back on release.

```tsx
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Springs } from "@/constants/motion";

const press = useSharedValue(0);
const style = useAnimatedStyle(() => ({ transform: [{ scale: 1 - press.value * 0.04 }] }));
// onPressIn:  press.value = withSpring(1, Springs.press)
// onPressOut: press.value = withSpring(0, Springs.pop)
```

Prefer `PressableScale` (from `@/tw`) or the `Card`/`IconButton`/`ChunkyButton`
components, which already do this.

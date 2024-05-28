import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { WIDTH, SHADOW } from '@/assets/styles';

type CollapsibleButtonProps = PropsWithChildren<{
  title: string;
  style?: ViewStyle;
}>;

export function CollapsibleButton({ children, title, style }: PropsWithChildren &  CollapsibleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ThemedView >
      <TouchableOpacity
        style={[styles.heading, SHADOW, style]}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <ThemedText style={{
          textAlign: 'center',
        }} type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    gap: 6,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#D9D9D9',
    padding: 10,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: 5,
    paddingVertical: 5,
    marginBottom:5,
  },
});

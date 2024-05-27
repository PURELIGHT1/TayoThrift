import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';

type TabBarIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  style?: ComponentProps<typeof Ionicons>['style'];
};


export const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color, style, ...rest }) => {
  return <Ionicons name={name} size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
};
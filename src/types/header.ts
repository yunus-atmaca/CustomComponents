import {Ic_Play} from '@src/res';
import {SvgProps} from 'react-native-svg';

export type THeader =
  | {
      title?: string;
      prefixIc?: React.FC<SvgProps>;
      postfixIc?: React.FC<SvgProps>;
      onPrefix?: () => void;
      onPostfix?: () => void;
    }
  | undefined;

const HomeHProps: THeader = {
  title: 'Home Title',
  postfixIc: Ic_Play,
};

const ProfileHProps: THeader = undefined;

const HeaderProps = {
  HomeScreen: HomeHProps,
  ProfileScreen: ProfileHProps,
};

export const createHeaderProps = (header: keyof typeof HeaderProps): THeader =>
  HeaderProps[header];

import React from 'react';
import { Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import onboardingStyles from './LandingScreenStyle';
import { useTheme } from '../../utils/themeContext';

const { theme } = useTheme();

const isDark = theme === 'dark';

const dynamicStyles = {
  backgroundColor: isDark ? '#121212' : '#fff',
  color: isDark ? '#fff' : '#000',
  inputBg: isDark ? '#1e1e1e' : '#f9f9f9',
  borderColor: isDark ? '#333' : '#ddd',
};

export default function OnboardingScreen({ navigation }) {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.replace('Login')}
      containerStyles={onboardingStyles.container}
      imageContainerStyles={{ paddingBottom: 20 }}
      titleStyles={onboardingStyles.title}
      subTitleStyles={onboardingStyles.subtitle}
      DotComponent={({ selected }) => (
        <Image
          style={selected ? onboardingStyles.activeDot : onboardingStyles.dot}
        />
      )}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={{
                uri: 'https://thumbs.dreamstime.com/b/schattenbild-der-schwangeren-frau-20559402.jpg',
              }}
              style={onboardingStyles.image}
            />
          ),
          title: 'Pregnancy Tracker',
          subtitle: 'Monitor each stage of your journey with ease.',
        },
        {
          backgroundColor: '#fdeb93',
          image: (
            <Image
              source={{
                uri: 'https://elitovskayasosh.gosuslugi.ru/netcat_files/58/735/2362600_860x860.png',
              }}
              style={onboardingStyles.image}
            />
          ),
          title: 'Expert Advice',
          subtitle: 'Access reliable health tips and trusted resources.',
        },
        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              source={{
                uri: 'https://thumbs.dreamstime.com/b/%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%BE%D0%B1%D1%81%D0%BB%D1%83%D0%B6%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-%D0%BA%D0%BB%D0%B8%D0%B5%D0%BD%D1%82%D0%BE%D0%B2-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB-%D1%81%D0%BE%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D0%B8-%D0%B2-%D0%BF%D0%BB%D0%BE%D1%81%D0%BA%D0%BE%D0%BC-%D1%81%D1%82%D0%B8%D0%BB%D0%B5-252459610.jpg',
              }}
              style={onboardingStyles.image}
            />
          ),
          title: 'Community Support',
          subtitle: 'Connect with other mothers and caregivers.',
        },
      ]}
    />
  );
}

import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { RequirementCheck } from './RequirementCheck';

type PasswordRequirementsProps = {
    passwordText: string;
    style?: StyleProp<ViewStyle>;
};

export type PasswordRequirement = {
  description: string;
  regex: RegExp;
};

const SPECIAL_CHAR_REGEX = /[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]+/;
const LENGTH_REGEX = /^.{8,16}$/;
const NUMBERS_REGEX = /[0-9]+/;
const UPPER_CASE_REGEX = /[A-Z]+/;
const LOWER_CASE_REGEX = /[a-z]+/;

export const passwordRequirements: PasswordRequirement[] = [
  {
      regex: LENGTH_REGEX,
      description: 'At least 8 characters in length',
  },
  {
      regex: NUMBERS_REGEX,
      description: 'At least 1 digit',
  },
  {
      regex: UPPER_CASE_REGEX,
      description: 'At least 1 uppercase letter',
  },
  {
      regex: LOWER_CASE_REGEX,
      description: 'At least 1 lowercase letter',
  },
  {
      regex: SPECIAL_CHAR_REGEX,
      description: 'At least 1 special character: (valid: ! @ # $ ^ &)',
  },
];

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = (props) => {
    const { passwordText, style } = props;
  
    return (
        <View style={style}>
            {passwordRequirements.map((req: PasswordRequirement, ind: number) => (
                <RequirementCheck
                    key={`password_requirement_${ind}`}
                    text={req.description}
                    isChecked={new RegExp(req.regex).test(passwordText)}
                />
            ))}
        </View>
    );
};
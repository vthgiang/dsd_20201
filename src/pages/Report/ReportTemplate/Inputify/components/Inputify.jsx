import * as React from "react";
import { withDefaultProps } from "with-default-props";

import defaultComponentDecorator from "../decorators/defaultComponentDecorator";
import defaultMatchDecorator from "../decorators/defaultMatchDecorator";
import defaultInputDecorator from "../decorators/defaultInputDecorator";

function Inputify(props) {
  const parseString = (string) => {
    if (string === "") {
      return string;
    }

    const matches = props.matchDecorator(string);
    if (!matches) {
      return string;
    }

    const elements = [];
    let lastIndex = 0;
    matches.forEach((match, i) => {
      // Push preceding text if there is any
      if (match.index > lastIndex) {
        elements.push(string.substring(lastIndex, match.index));
      }

      const decoratedInput = props.inputDecorator(match.input);
      const decoratedComponent = props.componentDecorator(decoratedInput, i);
      elements.push(decoratedComponent);

      lastIndex = match.lastIndex;
    });

    // Push remaining text if there is any
    if (string.length > lastIndex) {
      elements.push(string.substring(lastIndex));
    }

    return elements.length === 1 ? elements[0] : elements;
  };

  const parse = (children, key = 0): any => {
    if (typeof children === "string") {
      return parseString(children);
    } else if (
      React.isValidElement(children) &&
      children.type !== "a" &&
      children.type !== "button"
    ) {
      return React.cloneElement(
        children,
        { key: key },
        parse(children.props.children)
      );
    } else if (Array.isArray(children)) {
      return children.map((child, i) => parse(child, i));
    }

    return children;
  };

  return <React.Fragment>{parse(props.children)}</React.Fragment>;
}

const defaultProps = {
  componentDecorator: defaultComponentDecorator,
  matchDecorator: defaultMatchDecorator,
  inputDecorator: defaultInputDecorator,
};

export default withDefaultProps(Inputify, defaultProps);

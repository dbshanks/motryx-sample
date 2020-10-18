export const Container = (props) => {
  const { width, children, className, p, pt, pb, pl, pr, ...rest } = props;
  const containerStyles = {
    width: `${width}%`,
    padding: `${p}rem`,
    paddingTop: `${pt}rem`,
    paddingRight: `${pr}rem`,
    paddingBottom: `${pb}rem`,
    paddingLeft: `${pl}rem`,
    margin: '0 auto',
  };
  return (
    <div style={containerStyles} {...rest} className={`${className}`}>
      {children}
    </div>
  );
};

export const Row = (props) => {
  const { children, className, ...rest } = props;
  const rowStyles = {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  };
  return (
    <div style={rowStyles} {...rest} className={`${className}`}>
      {children}
    </div>
  );
};

export const Column = (props) => {
  const { col, children, className, ...rest } = props;
  const colStyles = {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: `calc(100% / 12 * ${col})`,
  };

  return (
    <div style={colStyles} {...rest} className={`${className}`}>
      {children}
    </div>
  );
};

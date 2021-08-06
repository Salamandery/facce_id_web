import styled from 'styled-components';
import MaskedInput from 'react-text-mask';

export const Form = styled.div`
  display: flex;
  padding: ${(props) => props.pad || 0};
  ${(props) => (props.marginTop ? 'margin: 10px 0px 0px;' : null)};
  align-self: ${(props) => props.self};
  flex-direction: ${(props) => props.direction};
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  ${(props) => (props.bg ? `background: ${props.bg}` : null)};
  ${(props) => (props.fColor ? `color: ${props.fColor}` : null)};
  ${(props) => (props.content ? `justify-content: ${props.content}` : null)};
  ${(props) => (props.items ? `align-items: ${props.items}` : null)};
`;
export const Text = styled.span`
  padding: ${(props) => props.pad || 0};
  ${(props) => (props.marginTop ? 'margin: 10px 0px 0px;' : '0')};
  ${(props) => (props.bg ? `background: ${props.bg}` : 'transparent')};
  ${(props) => (props.fColor ? `color: ${props.fColor}` : '#000')};
  ${(props) => (props.fSize ? `font-size: ${props.fSize}` : '18px;')};
  ${(props) => (props.bold ? 'font-weight: bold' : null)};
`;
export const CardBlock = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : null)};
  background: ${(props) => props.bgColor || '#333'};
  margin: ${(props) => props.margin || 'auto 0'};
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  ${(props) => (props.overflow ? `overflow: ${props.overflow};` : null)};
  box-shadow: 0px 0px 10px 0.5px rgba(12, 12, 12, 0.1);
`;
export const CardButton = styled.div`
  display: flex;
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : null)};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.bgColor || '#333'};
  height: ${(props) =>
    props.size === 'small'
      ? '50px'
      : props.size === 'md'
      ? '100px'
      : props.size === 'high'
      ? '200px'
      : '36px'};
  width: ${(props) =>
    props.size === 'small'
      ? '50px'
      : props.size === 'md'
      ? '150px'
      : props.size === 'high'
      ? '200px'
      : '36px'};
  border-radius: 5px;
  border: ${(props) => props.border || '1px solid black'};
  margin: 0px 10px;
  padding: 5px 10px;
  color: ${(props) => props.fColor || '#333'};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.hColor || '#333'};
    color: ${(props) => props.fhColor || '#fff'};
  }

  > span {
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
    font-size: ${(props) => props.SPSize || '15px'};
    text-transform: uppercase;
  }
  > p {
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: underline;
    color: #ffb3b3;
    margin-top: 2px;
  }
`;
export const Wrapper = styled.div`
  ${(props) => (props.border ? 'border: 1px solid #999;' : null)}
  padding: ${(props) => props.pad || 0};
  margin: ${(props) => props.margin || 0};
  display: flex;
  height: ${(props) => props.h};
  width: ${(props) => props.w};
  justify-content: ${(props) => props.content || 'baseline'};
  align-items: ${(props) => props.items || 'flex-start'};
  flex-wrap: wrap;

  > h1 {
    text-transform: uppercase;
  }
`;
export const FieldSet = styled.fieldset`
  ${(props) => (props.border ? 'border: 1px solid #999;' : null)}
  padding: 9px;
  margin: 5px;
  display: flex;
  height: ${(props) => props.h};
  width: ${(props) => props.w};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.content || 'baseline'};
  align-items: ${(props) => props.items || 'flex-start'};
  flex-wrap: wrap;

  > legend {
    text-transform: uppercase;
  }
`;
export const Container = styled.div`
  display: ${(props) => props.display || 'flex'};
  gap: ${(props) => props.gap || null};
  border: ${(props) => props.border || null};
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : null)};
  margin: ${(props) => props.margin || 0};
  margin-right: ${(props) => props.marginRight || 0};
  background: ${(props) => props.bgColor || '#222'};
  padding: ${(props) => props.pad || 0};
  align-self: ${(props) => props.self};
  align-items: ${(props) => props.items};
  justify-content: ${(props) => props.content};
  flex-direction: ${(props) => props.direction};
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  ${(props) => (props.overflow ? `overflow: ${props.overflow};` : null)};
  ${(props) =>
    props.shadow ? 'box-shadow: 0px 0px 10px .5px rgba(0, 0, 0, 0.1);' : null};
`;
export const List = styled.div`
  display: flex;
  border: ${(props) => props.border || null};
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : null)};
  margin: ${(props) => props.margin || 0};
  margin-right: ${(props) => props.marginRight || 0};
  background: ${(props) => props.bgColor || null};
  padding: ${(props) => props.pad || 0};
  align-self: ${(props) => props.self};
  align-items: ${(props) => props.items};
  justify-content: ${(props) => props.content};
  flex-direction: ${(props) => props.direction};
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  ${(props) => (props.overflow ? `overflow: ${props.overflow};` : null)};
  ${(props) =>
    props.shadow ? 'box-shadow: 0px 0px 10px .5px rgba(0, 0, 0, 0.1);' : null};

  div:not(:last-of-type) {
    border-bottom: 1px solid #333;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    background: #e6e6e6;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background: #f2f2f2;
    }
  }
`;
export const Content = styled.div`
  display: flex;
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : null)};
  padding: ${(props) => props.pad || 0};
  background: ${(props) => props.bgColor || null};
  align-self: ${(props) => props.self};
  align-items: ${(props) => props.items};
  justify-content: ${(props) => props.content};
  flex-direction: ${(props) => props.direction};
  width: ${(props) => props.w};
  height: ${(props) => props.h};
`;
export const MaskInput = styled(MaskedInput)`
  margin-bottom: ${(props) => props.mBottom || '10px'};
  ${(props) => (props.marginright ? 'margin: 0 10px 10px 0;' : null)};
  padding: 10px 15px;
  align-self: stretch;
  border-radius: 3px;
  color: #333;
  ${(props) => (props.borderless ? 'border: 0' : 'border: 1px solid #999;')};
  ${(props) =>
    props.bgless ? 'background: transparent' : 'background: #e6e6e6;'};
  ${(props) => (props.bold ? 'font-weight: bold' : null)};
  width: ${(props) => props.w};
  padding: ${(props) => props.pad};
  text-transform: uppercase;

  &:focus {
    border: 1px solid #999;
    border-radius: 4px;
  }
`;
export const Input = styled.input`
  margin-bottom: ${(props) => props.mBottom || '10px'};
  ${(props) => (props.marginright ? 'margin: 0 10px 10px 0;' : null)};
  padding: 10px 15px;
  align-self: stretch;
  border-radius: 3px;
  color: ${(props) => (props.bg ? `${props.fColor}` : '#333')};
  ${(props) => (props.borderless ? 'border: 0' : 'border: 1px solid #999;')};
  ${(props) =>
    props.bgless ? 'background: transparent' : 'background: #e6e6e6;'};
  ${(props) => (props.bg ? `background: ${props.bg}` : null)};
  ${(props) => (props.bold ? 'font-weight: bold' : null)};
  width: ${(props) => props.w};
  padding: ${(props) => props.pad};
  text-transform: uppercase;

  &:focus {
    ${(props) =>
      props.borderfocus ? props.borderfocus : 'border: 1px solid #999;'};
    ${(props) => (props.bgHover ? `background: ${props.bgHover}` : null)};
    border-radius: 4px;
  }
`;

export const Select = styled.select`
  max-width: ${(props) => props.maxW};
  ${(props) =>
    props.ellipsis ? 'text-overflow: ellipsis; overflow: hidden;' : null};
  margin-bottom: ${(props) => props.mBottom || '10px'};
  padding: 2px 6px;
  border-radius: 3px;
  ${(props) => (props.marginright ? 'margin: 0 10px 10px 0;' : null)};
  font-size: 10px;
  text-align: center;
  height: 42px;
  line-height: 20px;
  color: #333;
  text-transform: uppercase;
  width: ${(props) => props.w};
  ${(props) => (props.borderless ? 'border: 0' : 'border: 1px solid #999;')};
  ${(props) =>
    props.bgless ? 'background: transparent' : 'background: #e6e6e6;'};
  ${(props) => (props.bold ? 'font-weight: bold' : null)};

  &:focus {
    border: 1px solid #999;
    ${(props) => (props.bgHover ? `background: ${props.bgHover}` : null)};
    border-radius: 4px;
  }
`;
export const TextArea = styled.textarea`
  margin-bottom: ${(props) => props.mBottom || '10px'};
  height: ${(props) => props.h};
  width: ${(props) => props.w};
  resize: none;
  padding: 10px 15px;
  align-self: stretch;
  border-radius: 3px;
  border: 1px solid #999;
  background: #eee;
  font-size: 12px;
  color: #333;
  font-weight: ${(props) => (props.bold ? 'bold' : null)};

  &:focus {
    font-size: 14px;
    font-weight: bold;
  }
`;
export const ButtonDefault = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${(props) =>
    props.size === 'small'
      ? '16px'
      : props.size === 'md'
      ? '20px'
      : props.size === 'high'
      ? '26px'
      : '20px'};
  background: ${(props) =>
    props.tp === 'success'
      ? '#2eb82e'
      : props.tp === 'warn'
      ? '#ff0000'
      : props.tp === 'action'
      ? '#1a75ff'
      : '#999'};
  height: ${(props) =>
    props.size === 'small'
      ? '28px'
      : props.size === 'md'
      ? '42px'
      : props.size === 'high'
      ? '48px'
      : '36px'};
  border-radius: 5px;
  border: 0px;
  margin: ${(props) => props.margin || '0 10px'};
  padding: 5px 10px;
  color: #fff;
  font-weight: bold;
  &:hover {
    background: ${(props) =>
      props.tp === 'success'
        ? '#248f24'
        : props.tp === 'warn'
        ? '#b30000'
        : props.tp === 'action'
        ? '#0052cc'
        : '#666'};
    ${(props) => (props.hColor ? `background:  ${props.hColor};` : null)};
    color: #fff;
  }

  > span {
    text-transform: uppercase;
    margin-left: 10px;
  }
`;
export const AButton = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${(props) =>
    props.size === 'small'
      ? '16px'
      : props.size === 'md'
      ? '20px'
      : props.size === 'high'
      ? '26px'
      : '20px'};
  background: ${(props) =>
    props.tp === 'success'
      ? '#2eb82e'
      : props.tp === 'warn'
      ? '#ff0000'
      : props.tp === 'action'
      ? '#1a75ff'
      : '#999'};
  height: ${(props) =>
    props.size === 'small'
      ? '28px'
      : props.size === 'md'
      ? '42px'
      : props.size === 'high'
      ? '48px'
      : '36px'};
  border-radius: 5px;
  border: 0px;
  margin: ${(props) => props.margin || '0 10px'};
  padding: 5px 10px;
  color: #fff;
  font-weight: bold;
  &:hover {
    background: ${(props) =>
      props.tp === 'success'
        ? '#248f24'
        : props.tp === 'warn'
        ? '#b30000'
        : props.tp === 'action'
        ? '#0052cc'
        : '#666'};
    ${(props) => (props.hColor ? `background:  ${props.hColor};` : null)};
    color: #fff;
  }

  > span {
    text-transform: uppercase;
    margin-left: 10px;
  }
`;
export const Table = styled.table`
  width: 100%;
  height: ${(props) => props.h};
  border-radius: 4px;
  background: ${(props) => props.bgColor || '#fff'};

  thead,
  tbody tr {
    table-layout: fixed;
  }
  thead {
    background: #e6e6e6;
  }
  thead th {
    border: 0;
  }
  thead th {
    background: ${(props) => props.titleBgColor || '#e6e6e6'};
    color: ${(props) => props.titleColor || '#999'};
    text-align: ${(props) => props.titleAlign};
    padding: 12px;
    text-transform: uppercase;
  }
  tbody {
    width: 100%;
    height: 100%;
  }
  tbody {
    overflow-y: auto;
  }
  tbody tr:not(:last-of-type) td {
    border-bottom: 1px solid #eee;
  }
  tbody tr td {
    max-width: ${(props) => props.maxW};
    ${(props) =>
      props.ellipsis ? 'text-overflow: ellipsis; overflow: hidden;' : null};
    text-transform: ${(props) => props.upper};
    padding: 12px;
    text-align: ${(props) => props.textAlign || 'center'};
    vertical-align: middle;
    font-weight: bold;
    color: ${(props) => props.textColor || '#666'};
    font-size: ${(props) => props.fontSize};
    text-transform: uppercase;
  }

  ${(props) =>
    props.childGroup
      ? "tbody tr td:first-child {display: flex;width: 5%;justify-content: 'flex-end'};flex-direction: row;} thead tr th:first-child {text-align: center;} "
      : null}
`;
export const Link = styled.a`
  color: ${(props) => props.color || '#0052cc'};
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  font-size: ${(props) => props.fSize};

  &:hover {
    color: ${(props) => props.hColor || '#003380'};
  }
`;
export const Title = styled.h1`
  font-size: 20px;
  color: #000;
  margin-bottom: 15px;
`;
export const Desc = styled.h2`
  font-size: 18px;
  color: #999;
  margin-bottom: 15px;
`;
export const LinkDropdown = styled.div`
  margin: 0px 50px;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
    background-color: #0052cc;
  }

  li a,
  .dropbtn {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover,
  .dropdown:hover .dropbtn {
    background-color: red;
  }

  li.dropdown {
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }

  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`;

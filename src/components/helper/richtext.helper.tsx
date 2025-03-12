<<<<<<< HEAD
=======
// @ts-nocheck

>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
import { Editor, Element as SlateElement, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import Button from '../ui/Button';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

<<<<<<< HEAD
//@ts-expect-error This is fine
=======
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
const isBlockActive = (editor, format, blockType = 'type') => {
	const { selection } = editor;
	if (!selection) return false;

	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: (n) =>
<<<<<<< HEAD
				!Editor.isEditor(n) && SlateElement.isElement(n) && (n as any)[blockType] === format,
=======
				!Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
		}),
	);

	return !!match;
};
<<<<<<< HEAD
//@ts-expect-error This is fine
=======
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
export const toggleBlock = (editor, format) => {
	const isActive = isBlockActive(
		editor,
		format,

		TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
	);

	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) &&
			SlateElement.isElement(n) &&
<<<<<<< HEAD
			LIST_TYPES.includes((n as any).type) &&
			!TEXT_ALIGN_TYPES.includes(format),
		split: true,
	});
	let newProperties: any /*Partial<SlateElement>*/;
=======
			LIST_TYPES.includes(n.type) &&
			!TEXT_ALIGN_TYPES.includes(format),
		split: true,
	});
	let newProperties: Partial<SlateElement>;
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)

	if (TEXT_ALIGN_TYPES.includes(format)) {
		newProperties = {
			align: isActive ? undefined : format,
		};
	} else {
		newProperties = {
			type: isActive ? 'paragraph' : isList ? 'list-item' : format,
		};
	}

	Transforms.setNodes<SlateElement>(editor, newProperties);

	if (!isActive && isList) {
		const block = { type: format, children: [] };

		Transforms.wrapNodes(editor, block);
	}
};

<<<<<<< HEAD
const isMarkActive = (editor: any, format: any) => {
	const marks = Editor.marks(editor);

	return marks ? (marks as any)[format] === true : false;
};
export const toggleMark = (editor: any, format: any) => {
=======
const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor);

	return marks ? marks[format] === true : false;
};
export const toggleMark = (editor, format) => {
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

<<<<<<< HEAD
//@ts-expect-error This is fine
export const Element = ({ attributes, children, element }) => {
	const style = { textAlign: element.align };
=======
// eslint-disable-next-line react/prop-types
export const Element = ({ attributes, children, element }) => {
	// eslint-disable-next-line react/prop-types
	const style = { textAlign: element.align };
	// eslint-disable-next-line react/prop-types
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
	switch (element.type) {
		case 'block-quote':
			return (
				<blockquote style={style} {...attributes}>
					{children}
				</blockquote>
			);
		case 'bulleted-list':
			return (
				<ul style={style} {...attributes}>
					{children}
				</ul>
			);
		case 'heading-one':
			return (
				<h1 style={style} {...attributes}>
					{children}
				</h1>
			);
		case 'heading-two':
			return (
				<h2 style={style} {...attributes}>
					{children}
				</h2>
			);
		case 'list-item':
			return (
				<li style={style} {...attributes}>
					{children}
				</li>
			);
		case 'numbered-list':
			return (
				<ol style={style} {...attributes}>
					{children}
				</ol>
			);
		default:
			return (
				<p style={style} {...attributes}>
					{children}
				</p>
			);
	}
};

<<<<<<< HEAD
//@ts-expect-error This is fine
export const Leaf = ({ attributes, children, leaf }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}
	if (leaf.code) {
		children = <code>{children}</code>;
	}
	if (leaf.italic) {
		children = <em>{children}</em>;
	}
=======
// eslint-disable-next-line react/prop-types
export const Leaf = ({ attributes, children, leaf }) => {
	// eslint-disable-next-line react/prop-types
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	// eslint-disable-next-line react/prop-types
	if (leaf.code) {
		children = <code>{children}</code>;
	}

	// eslint-disable-next-line react/prop-types
	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	// eslint-disable-next-line react/prop-types
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};

<<<<<<< HEAD
//@ts-expect-error This is fine
=======
// eslint-disable-next-line react/prop-types
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
export const BlockButton = ({ format, icon }) => {
	const editor = useSlate();
	return (
		<Button
			icon={icon}
			isActive={isBlockActive(
				editor,
				format,

				TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
			)}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleBlock(editor, format);
			}}
		/>
	);
};

<<<<<<< HEAD
//@ts-expect-error This is fine
=======
// eslint-disable-next-line react/prop-types
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
export const MarkButton = ({ format, icon }) => {
	const editor = useSlate();
	return (
		<Button
			icon={icon}
			isActive={isMarkActive(editor, format)}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleMark(editor, format);
			}}
		/>
	);
};

<<<<<<< HEAD
//@ts-expect-error This is fine
=======
// eslint-disable-next-line react/prop-types
>>>>>>> bd4d433 (Initial incorporation of the dashboard.  Fixed some warnings)
export const Toolbar = ({ children }) => {
	return (
		<span className='flex items-center justify-between bg-zinc-100 dark:bg-zinc-800'>
			{children}
		</span>
	);
};

interface IToolbarChildProps {
	children: ReactNode;
	className?: string;
}
export const ToolbarChild: FC<IToolbarChildProps> = ({ children, className }) => {
	return <span className={classNames('flex items-center', className)}>{children}</span>;
};

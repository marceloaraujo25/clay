/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import ClayAutocomplete from '@clayui/autocomplete';
import ClayButton from '@clayui/button';
import ClayDropDown, {ClayDropDownWithItems} from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';
import React, {useContext, useRef, useState} from 'react';

import ClayModal, {ClayModalProvider, Context, useModal} from '../src';

export default {
	argTypes: {
		size: {
			control: {type: 'select'},
			options: ['full-screen', 'lg', 'sm', undefined],
		},
		status: {
			control: {type: 'select'},
			options: ['danger', 'info', 'success', 'warning', undefined],
		},
	},
	component: ClayModal,
	title: 'Design System/Components/Modal',
};

export const Default = (args: any) => {
	const [visibleModal, setVisibleModal] = useState<boolean>(false);
	const {observer, onClose} = useModal({
		onClose: () => setVisibleModal(false),
	});

	return (
		<>
			{visibleModal && (
				<ClayModal
					center={args.center}
					disableAutoClose={args.autoClose}
					observer={observer}
					size={args.size}
					status={args.status}
				>
					<ClayModal.Header>{args.title}</ClayModal.Header>
					<ClayModal.Body
						iFrameProps={{
							'aria-label': 'Hello World',
						}}
						scrollable={args.scrollable}
						url={args.url}
					>
						<h1>Hello world!</h1>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Curabitur dignissim eu ante eget lobortis.
							Praesent a mattis diam, nec auctor nisi. Nam porta
							lobortis massa hendrerit sagittis. Integer sit amet
							risus accumsan nunc pretium convallis eget eu
							tellus. Mauris id massa nec nunc mollis sagittis.
							Class aptent taciti sociosqu ad litora torquent per
							conubia nostra, per inceptos himenaeos. Nulla sit
							amet turpis dui. Aliquam et urna id nisl posuere
							condimentum. Nullam arcu lacus, fermentum sit amet
							quam sed, consequat semper nisi. Vivamus varius
							ligula et viverra placerat. Sed eget quam magna. Ut
							posuere enim porttitor, mollis justo eget, molestie
							mauris. Duis lobortis purus quis risus sodales
							dictum ut eu velit.
						</div>
					</ClayModal.Body>
					<ClayModal.Footer
						first={
							<ClayButton.Group spaced>
								<ClayButton displayType="secondary">
									Secondary
								</ClayButton>
								<ClayButton displayType="secondary">
									Secondary
								</ClayButton>
							</ClayButton.Group>
						}
						last={
							<ClayButton onClick={onClose}>Primary</ClayButton>
						}
					/>
				</ClayModal>
			)}
			<ClayButton
				displayType="primary"
				onClick={() => setVisibleModal(true)}
			>
				Open modal
			</ClayButton>
		</>
	);
};

Default.args = {
	autoClose: true,
	center: false,
	scrollable: false,
	size: 'lg',
	status: undefined,
	title: 'Title',
	url: '',
};

export const CustomHeader = () => {
	const [visibleModal, setVisibleModal] = useState<boolean>(false);
	const {observer, onClose} = useModal({
		onClose: () => setVisibleModal(false),
	});

	return (
		<>
			{visibleModal && (
				<ClayModal observer={observer} size="lg">
					<ClayModal.Header withTitle={false}>
						<ClayModal.ItemGroup>
							<ClayModal.Item>
								<ClayModal.TitleSection>
									<ClayModal.Title>
										<ClayModal.TitleIndicator>
											<ClayIcon symbol="info-circle" />
										</ClayModal.TitleIndicator>
										Modal Title
									</ClayModal.Title>
								</ClayModal.TitleSection>
							</ClayModal.Item>
							<ClayModal.Item shrink>
								<ClayModal.SubtitleSection>
									<ClayModal.Subtitle>
										Modal Subtitle
									</ClayModal.Subtitle>
								</ClayModal.SubtitleSection>
							</ClayModal.Item>
						</ClayModal.ItemGroup>

						<ClayButton
							aria-label="close"
							className="close"
							displayType="unstyled"
							onClick={onClose}
						>
							<ClayIcon symbol="times" />
						</ClayButton>
					</ClayModal.Header>
					<ClayModal.Body />
				</ClayModal>
			)}

			<ClayButton
				displayType="primary"
				onClick={() => setVisibleModal(true)}
			>
				Open modal
			</ClayButton>
		</>
	);
};

const dropDownItems = [
	{
		label: 'clickable',
		onClick: () => {
			alert('you clicked!');
		},
	},
	{
		type: 'divider' as const,
	},
	{
		items: [
			{
				label: 'one',
				type: 'radio' as const,
				value: 'one',
			},
			{
				label: 'two',
				type: 'radio' as const,
				value: 'two',
			},
		],
		label: 'radio',
		name: 'radio',
		onChange: (value: string) => alert(`New Radio checked ${value}`),
		type: 'radiogroup' as const,
	},
	{
		items: [
			{
				checked: true,
				label: 'checkbox',
				onChange: () => alert('checkbox changed'),
				type: 'checkbox' as const,
			},
			{
				checked: true,
				label: 'checkbox 1',
				onChange: () => alert('checkbox changed'),
				type: 'checkbox' as const,
			},
		],
		label: 'checkbox',
		type: 'group' as const,
	},
	{
		href: '#',
		label: 'linkable',
	},
];

const Autocomplete = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [value, setValue] = useState('');
	const [active, setActive] = useState(!!value);

	const filteredItems = ['one', 'two', 'three', 'four', 'five'].filter(
		(item) => item.match(value)
	);

	return (
		<ClayAutocomplete>
			<ClayAutocomplete.Input
				aria-label="Numbers: Enter a number from One to Five"
				autoFocus
				onBlur={() => {
					setActive(false);
				}}
				onChange={(event: any) => {
					setValue(event.target.value);
					setActive(!!event.target.value);
				}}
				ref={inputRef}
				value={value}
			/>

			<ClayAutocomplete.DropDown active={active} onSetActive={setActive}>
				<ClayDropDown.ItemList>
					{filteredItems.map((item) => (
						<ClayAutocomplete.Item
							key={item}
							match={value}
							onMouseDown={() => {
								setActive(false);
								setValue(item);
							}}
							value={item}
						/>
					))}
				</ClayDropDown.ItemList>
			</ClayAutocomplete.DropDown>
		</ClayAutocomplete>
	);
};

export const AutocompleteAndDropDown = () => {
	const [visibleModal, setVisibleModal] = useState<boolean>(false);
	const {observer} = useModal({
		onClose: () => setVisibleModal(false),
	});

	return (
		<>
			{visibleModal && (
				<ClayModal observer={observer} size="lg">
					<ClayModal.Header>Title</ClayModal.Header>
					<ClayModal.Body
						iFrameProps={{
							'aria-label': 'Hello World',
						}}
					>
						<div className="row">
							<div className="col-md-3">
								<Autocomplete />
							</div>
							<div className="col-md-3">
								<ClayDropDownWithItems
									items={dropDownItems}
									trigger={<ClayButton>Click Me</ClayButton>}
								/>
							</div>
						</div>
					</ClayModal.Body>
				</ClayModal>
			)}
			<ClayButton
				displayType="primary"
				onClick={() => setVisibleModal(true)}
			>
				Open modal
			</ClayButton>
		</>
	);
};

const MyApp: React.FunctionComponent<any> = () => {
	const [state, dispatch] = useContext(Context);

	return (
		<ClayButton
			displayType="primary"
			onClick={() =>
				dispatch({
					payload: {
						body: <h1>Hello world!</h1>,
						footer: [
							<></>,
							<></>,
							<ClayButton key={3} onClick={state.onClose}>
								Primary
							</ClayButton>,
						],
						header: 'Title',
						size: 'lg',
					},
					type: 1,
				})
			}
		>
			Open modal
		</ClayButton>
	);
};

const MyAppWithoutFooterAndHeader: React.FunctionComponent<any> = () => {
	const [, dispatch] = useContext(Context);

	return (
		<ClayButton
			displayType="primary"
			onClick={() =>
				dispatch({
					payload: {
						body: <h1>Hello world!</h1>,
						size: 'lg',
					},
					type: 1,
				})
			}
		>
			Open modal without Footer and Header
		</ClayButton>
	);
};

export const Provider = () => (
	<ClayModalProvider>
		<MyApp />

		<MyAppWithoutFooterAndHeader />
	</ClayModalProvider>
);

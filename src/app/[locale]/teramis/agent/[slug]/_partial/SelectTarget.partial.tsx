'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
import Icon from '@/components/icon/Icon';
import Button from '@/components/ui/Button';
import Input from '@/components/form/Input';
import FieldWrap from '@/components/form/FieldWrap';
import useDomRect from '@/hooks/useDomRect';
import Badge from '@/components/ui/Badge';
import Modal, { ModalBody, ModalHeader } from '@/components/ui/Modal';

interface TargetList {
    target: {
        id: string,
        name: string,
        root: string
    }
}

type TSavingStateAction = React.Dispatch<React.SetStateAction<string>>
interface ITargetSelectProps {
    targets:TargetList[];
    targetId: string;
    setTargetId: TSavingStateAction
}
const TargetSelectPartial = ({targets, targetId, setTargetId}:ITargetSelectProps) => {
    console.log(targets, targetId)
    const ref = useRef<HTMLDivElement>(null);
    // @ts-expect-error This is fine - DOMRect
    const [domRect] = useDomRect(ref);

    const searchField = targets.find(v => v.target.id === targetId)?.target.root ?? ''

    const formik = useFormik({
        onSubmit(): void | Promise<never> {
            return undefined;
        },
        initialValues: {
            searchField,
        },
    });

    const leftContent = <Icon icon='HeroFolder' className='mx-2' />;
    const rightContent = formik.values.searchField ? (
        <Button
            icon='HeroXMark'
            color='red'
            size='sm'
            rounded='rounded'
            className=''
            onClick={() => formik.setFieldValue('searchField', '')}
        />
    ) : (
        <Button
            variant='solid'
            color='blue'
            size='sm'
            rounded='rounded'
            className='!px-2 font-bold'>
            ⌘ K
        </Button>
    );

    const result = targets.filter(
        (key) =>
            key.target.root.toLowerCase().includes(formik.values.searchField.toLowerCase()) ||
            key.target.name.toLowerCase().includes(formik.values.searchField.toLowerCase()),
    );

    const inputRef = useRef<HTMLInputElement>(null);
    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'k' && event.metaKey) {
                focusInput();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const [modalStatus, setModalStatus] = useState<boolean>(false);

    return (
        <div className='relative'>
            {/* For Desktop :: BEGIN */}
            <FieldWrap
                ref={ref}
                firstSuffix={leftContent}
                lastSuffix={rightContent}
                className='z-20 max-sm:hidden'>
                <Input
                    ref={inputRef}
                    name='searchField'
                    placeholder='Type a target name or root.'
                    className='min-w-[22rem]'
                    value={formik.values.searchField}
                    onChange={formik.handleChange}
                    autoComplete='on'
                />
            </FieldWrap>
            {formik.values.searchField && (
                <div
                    className='absolute top-0 z-10 h-auto w-full rounded-lg bg-white shadow-2xl outline outline-8 outline-white ring-2 ring-gray-100 ring-offset-8 dark:bg-zinc-950 dark:outline-zinc-950 dark:ring-zinc-800/50 max-sm:hidden'
                    style={{ paddingTop: domRect?.height }}>
                    <div className='max-h-96 divide-y divide-dashed divide-zinc-500/50 overflow-auto bg-white px-4 dark:bg-zinc-950 [&>*]:py-4'>
                        {result.length ? (
                            result.map((i) => (
                                <div key={i.target.id} className='grow'>
                                    <Button className='!p-0' icon='HeroFolder'>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: i.target.root.replace(
                                                    new RegExp(formik.values.searchField, 'gi'),
                                                    `<span class='bg-amber-500/50 text-zinc-950'>$&</span>`,
                                                ),
                                            }}
                                        />
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <div className='flex gap-2 text-zinc-500'>No result.</div>
                        )}
                    </div>
                </div>
            )}
            {/* For Desktop :: END */}

            {/* For Mobile :: BEGIN */}
            <Button
                icon='HeroMagnifyingGlass'
                className='!bg-amber-500 sm:hidden'
                onClick={() => setModalStatus(true)}
            />
            <Modal isOpen={modalStatus} setIsOpen={setModalStatus}>
                <ModalHeader>Search</ModalHeader>
                <ModalBody>
                    <FieldWrap firstSuffix={leftContent} lastSuffix={rightContent} className='z-20'>
                        <Input
                            name='searchField'
                            placeholder='Search or type a command'
                            className='min-w-[22rem]'
                            value={formik.values.searchField}
                            onChange={formik.handleChange}
                            autoComplete='off'
                        />
                    </FieldWrap>
                    {formik.values.searchField && (
                        <div className='z-10 h-auto w-full bg-white dark:bg-zinc-950 dark:outline-zinc-950 dark:ring-zinc-800/50 sm:hidden'>
                            <div className='max-h-96 divide-y divide-dashed divide-zinc-500/50 overflow-auto bg-white dark:bg-zinc-950 [&>*]:py-4'>
                                {result.length ? (
                                    result.map((i) => (
                                        <div key={`${i.target.id}-root`} className='grow'>
                                            <Button className='!p-0' icon='HeroFolder'>
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: i.target.root.replace(
                                                            new RegExp(
                                                                formik.values.searchField,
                                                                'gi',
                                                            ),
                                                            `<span class='bg-amber-500/50 text-zinc-950'>$&</span>`,
                                                        ),
                                                    }}
                                                />
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <div className='flex gap-2 text-zinc-500'>No result.</div>
                                )}
                            </div>
                        </div>
                    )}
                </ModalBody>
            </Modal>
            {/* For Mobile :: END */}
        </div>
    );
};

export default TargetSelectPartial;

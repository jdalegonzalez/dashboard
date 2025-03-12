'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import Button from '@/components/ui/Button';
import Input from '@/components/form/Input';
import Modal, { ModalBody, ModalFooter, ModalFooterChild, ModalHeader } from '@/components/ui/Modal';
import Checkbox from '@/components/form/Checkbox';
import Label from '@/components/form/Label';
import { ITriggerPayload } from '@/hooks/useAgent';

export interface ILaunchProps {
    root: string;
    skipCompleted: boolean;
    maxWorkers: number;
    memoryThreshold: number;
    useHistory: boolean;
    defaultTimeout: number;
    logicalCPUs: number;
    saveBtnDisable: boolean;
    triggerScan: (newData: ITriggerPayload) => Promise<void>;
}

const LaunchScanPartial = (props: ILaunchProps) => {
    const {
        root,
        skipCompleted,
        maxWorkers,
        memoryThreshold,
        useHistory,
        defaultTimeout,
        logicalCPUs,
        saveBtnDisable,
        triggerScan,
    } = props;

    const target = root ?? '';
	const [modalStatus, setModalStatus] = useState<boolean>(false);
	const formik = useFormik({
		onSubmit(values): void | Promise<never> {
            setModalStatus(false);
            triggerScan({
                status: 'PENDING',
                pathToScan: target, 
                ...values
            })
        },
		initialValues: {
            target,
            skipCompleted,
            maxWorkers,
            memoryThreshold,
            useHistory,
            defaultTimeout
		},
	});

    return (
		<div className='relative'>
            <Button
                icon='HeroRocketLaunch'
                variant='solid'
                color='sky'
                colorIntensity='700'
                isDisable={saveBtnDisable}
                onClick={() => setModalStatus(true)}>
                Scan Now
            </Button>
			<Modal isOpen={modalStatus} setIsOpen={setModalStatus} rounded='rounded-lg'>
				<ModalHeader>Launch Scan</ModalHeader>
				<ModalBody>
                    <div className='col-span-12 lg:col-span-6 p-4'>
                        <Label htmlFor='target'>
                            <div className='text-xl font-semibold'>
                                Target
                            </div>
                        </Label>
                        <Input
                            id='target'
                            name='target'
                            onChange={formik.handleChange}
                            value={formik.values.target}
                        />
                    </div>
                    <div className='col-span-12 lg:col-span-6 p-4'>
                        <div className='flex grow items-center'>
                            <Label htmlFor='skipCompleted' className='!mb-0'>
                                <div className='text-xl font-semibold'>
                                    Skip completed folders
                                </div>
                                <div className='text-zinc-500'>
                                    Only scan folders that weren&apos;t successfully scanned the last time.
                                </div>
                            </Label>
                        </div>
                        <div className='flex flex-shrink-0 items-center'>
                            <Checkbox
                                variant='switch'
                                id='skipCompleted'
                                name='skipCompleted'
                                onChange={formik.handleChange}
                                checked={formik.values.skipCompleted}
                            />
                        </div>
                    </div>                    
                    <div className='col-span-12 lg:col-span-6 p-4'>
                        <div className='flex grow items-center'>
                            <Label htmlFor='useHistory' className='!mb-0'>
                                <div className='text-xl font-semibold'>
                                    Use History
                                </div>
                                <div className='text-zinc-500'>
                                    Use the previous results for any file already scanned.
                                </div>
                            </Label>
                        </div>
                        <div className='flex flex-shrink-0 items-center'>
                            <Checkbox
                                variant='switch'
                                id='useHistory'
                                name='useHistory'
                                onChange={formik.handleChange}
                                checked={formik.values.useHistory}
                            />
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-6 p-4'>
                        <Label htmlFor='maxWorkers'>
                            <div className='text-xl font-semibold'>
                                Max Workers
                            </div>
                            <div className='text-zinc-500'>
                                Number of worker processes that will be launched to scan the target.
                            </div>
                        </Label>
                        <Input
                            type='number'
                            id='maxWorkers'
                            name='maxWorkers'
                            onChange={formik.handleChange}
                            value={formik.values.maxWorkers}
                            min={1}
                            max={logicalCPUs - 1}                            
                        />
                    </div>
                    <div className='col-span-12 lg:col-span-6 p-4'>
                        <Label htmlFor='defaultTimeout'>
                            <div className='text-xl font-semibold'>
                                Max Timeout
                            </div>
                            <div className='text-zinc-500'>
                                Number of seconds to try opening a file before giving up. &quot;0&quot; means wait as long as it takes.
                            </div>
                        </Label>
                        <Input
                            type='number'
                            id='defaultTimeout'
                            name='defaultTimeout'
                            onChange={formik.handleChange}
                            value={formik.values.defaultTimeout}
                            min={0}
                            max={360}
                        />
                    </div>                    
				</ModalBody>
                <ModalFooter>
                    <ModalFooterChild>
                    </ModalFooterChild>
                    <ModalFooterChild className='p-4'>
                    <Button
                        icon='DuoLte1'
                        variant='solid'
                        color='sky'
                        colorIntensity='700'
                        isDisable={false}
                        onClick={() => formik.handleSubmit()}>
                        Go
                    </Button>
                    </ModalFooterChild>
                </ModalFooter>
			</Modal>
		</div>
	);
};

export default LaunchScanPartial;

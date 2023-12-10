import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  AssignedOfficer as AssignedOfficerEvent,
  BatchMetadataUpdate as BatchMetadataUpdateEvent,
  ClosedFIR as ClosedFIREvent,
  MetadataUpdate as MetadataUpdateEvent,
  OpenedFIR as OpenedFIREvent,
  Transfer as TransferEvent,
  UpdatedFIR as UpdatedFIREvent
} from "../generated/EFIR/EFIR"
import {
  Approval,
  ApprovalForAll,
  AssignedOfficer,
  BatchMetadataUpdate,
  ClosedFIR,
  MetadataUpdate,
  OpenedFIR,
  Transfer,
  UpdatedFIR
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAssignedOfficer(event: AssignedOfficerEvent): void {
  let entity = new AssignedOfficer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.officer = event.params.officer
  entity.firId = event.params.firId
  entity.timeRecorded = event.params.timeRecorded

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBatchMetadataUpdate(
  event: BatchMetadataUpdateEvent
): void {
  let entity = new BatchMetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._fromTokenId = event.params._fromTokenId
  entity._toTokenId = event.params._toTokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClosedFIR(event: ClosedFIREvent): void {
  let entity = new ClosedFIR(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.officer = event.params.officer
  entity.firId = event.params.firId
  entity.timeRecorded = event.params.timeRecorded

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMetadataUpdate(event: MetadataUpdateEvent): void {
  let entity = new MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tokenId = event.params._tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOpenedFIR(event: OpenedFIREvent): void {
  let entity = new OpenedFIR(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.firId = event.params.firId
  entity.timeRecorded = event.params.timeRecorded
  entity.location = event.params.location

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdatedFIR(event: UpdatedFIREvent): void {
  let entity = new UpdatedFIR(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.officer = event.params.officer
  entity.firId = event.params.firId
  entity.timeRecorded = event.params.timeRecorded
  entity.tokenUri = event.params.tokenUri

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

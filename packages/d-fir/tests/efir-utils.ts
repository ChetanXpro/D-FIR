import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/EFIR/EFIR"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createAssignedOfficerEvent(
  officer: Address,
  firId: BigInt,
  timeRecorded: BigInt
): AssignedOfficer {
  let assignedOfficerEvent = changetype<AssignedOfficer>(newMockEvent())

  assignedOfficerEvent.parameters = new Array()

  assignedOfficerEvent.parameters.push(
    new ethereum.EventParam("officer", ethereum.Value.fromAddress(officer))
  )
  assignedOfficerEvent.parameters.push(
    new ethereum.EventParam("firId", ethereum.Value.fromUnsignedBigInt(firId))
  )
  assignedOfficerEvent.parameters.push(
    new ethereum.EventParam(
      "timeRecorded",
      ethereum.Value.fromUnsignedBigInt(timeRecorded)
    )
  )

  return assignedOfficerEvent
}

export function createBatchMetadataUpdateEvent(
  _fromTokenId: BigInt,
  _toTokenId: BigInt
): BatchMetadataUpdate {
  let batchMetadataUpdateEvent = changetype<BatchMetadataUpdate>(newMockEvent())

  batchMetadataUpdateEvent.parameters = new Array()

  batchMetadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_fromTokenId",
      ethereum.Value.fromUnsignedBigInt(_fromTokenId)
    )
  )
  batchMetadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_toTokenId",
      ethereum.Value.fromUnsignedBigInt(_toTokenId)
    )
  )

  return batchMetadataUpdateEvent
}

export function createClosedFIREvent(
  officer: Address,
  firId: BigInt,
  timeRecorded: BigInt
): ClosedFIR {
  let closedFirEvent = changetype<ClosedFIR>(newMockEvent())

  closedFirEvent.parameters = new Array()

  closedFirEvent.parameters.push(
    new ethereum.EventParam("officer", ethereum.Value.fromAddress(officer))
  )
  closedFirEvent.parameters.push(
    new ethereum.EventParam("firId", ethereum.Value.fromUnsignedBigInt(firId))
  )
  closedFirEvent.parameters.push(
    new ethereum.EventParam(
      "timeRecorded",
      ethereum.Value.fromUnsignedBigInt(timeRecorded)
    )
  )

  return closedFirEvent
}

export function createMetadataUpdateEvent(_tokenId: BigInt): MetadataUpdate {
  let metadataUpdateEvent = changetype<MetadataUpdate>(newMockEvent())

  metadataUpdateEvent.parameters = new Array()

  metadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )

  return metadataUpdateEvent
}

export function createOpenedFIREvent(
  owner: Address,
  firId: BigInt,
  timeRecorded: BigInt,
  location: string
): OpenedFIR {
  let openedFirEvent = changetype<OpenedFIR>(newMockEvent())

  openedFirEvent.parameters = new Array()

  openedFirEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  openedFirEvent.parameters.push(
    new ethereum.EventParam("firId", ethereum.Value.fromUnsignedBigInt(firId))
  )
  openedFirEvent.parameters.push(
    new ethereum.EventParam(
      "timeRecorded",
      ethereum.Value.fromUnsignedBigInt(timeRecorded)
    )
  )
  openedFirEvent.parameters.push(
    new ethereum.EventParam("location", ethereum.Value.fromString(location))
  )

  return openedFirEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createUpdatedFIREvent(
  officer: Address,
  firId: BigInt,
  timeRecorded: BigInt,
  tokenUri: string
): UpdatedFIR {
  let updatedFirEvent = changetype<UpdatedFIR>(newMockEvent())

  updatedFirEvent.parameters = new Array()

  updatedFirEvent.parameters.push(
    new ethereum.EventParam("officer", ethereum.Value.fromAddress(officer))
  )
  updatedFirEvent.parameters.push(
    new ethereum.EventParam("firId", ethereum.Value.fromUnsignedBigInt(firId))
  )
  updatedFirEvent.parameters.push(
    new ethereum.EventParam(
      "timeRecorded",
      ethereum.Value.fromUnsignedBigInt(timeRecorded)
    )
  )
  updatedFirEvent.parameters.push(
    new ethereum.EventParam("tokenUri", ethereum.Value.fromString(tokenUri))
  )

  return updatedFirEvent
}

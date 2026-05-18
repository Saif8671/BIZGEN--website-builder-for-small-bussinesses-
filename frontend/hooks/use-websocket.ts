"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useAuth } from "./use-auth"

type WebSocketEvent = {
  type: string
  [key: string]: any
}

export function useWebSocket() {
  const { profile } = useAuth()
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<WebSocketEvent | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const shouldReconnectRef = useRef(true)

  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
  }, [])

  const closeCurrentSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
  }, [])

  const getSocketUrl = useCallback((userId: string) => {
    const configuredBaseUrl = process.env.NEXT_PUBLIC_WS_URL?.trim()

    if (!configuredBaseUrl) {
      return null
    }

    return `${configuredBaseUrl.replace(/\/+$/, "")}/${userId}`
  }, [])

  const connect = useCallback(() => {
    // Only connect if we have a user profile with an ID
    if (!profile?.id) {
      setIsConnected(false)
      clearReconnectTimeout()
      closeCurrentSocket()
      return
    }

    const socketUrl = getSocketUrl(profile.id)

    if (!socketUrl) {
      setIsConnected(false)
      clearReconnectTimeout()
      closeCurrentSocket()
      return
    }

    shouldReconnectRef.current = true
    clearReconnectTimeout()

    // Close existing connection if any
    closeCurrentSocket()

    const ws = new WebSocket(socketUrl)
    wsRef.current = ws

    ws.onopen = () => {
      console.log("WebSocket connected")
      setIsConnected(true)
      clearReconnectTimeout()
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        setLastMessage(data)
      } catch (err) {
        console.error("Failed to parse WebSocket message", err)
      }
    }

    ws.onclose = () => {
      console.log("WebSocket disconnected")
      setIsConnected(false)

      if (!shouldReconnectRef.current) {
        wsRef.current = null
        return
      }

      reconnectTimeoutRef.current = setTimeout(() => {
        console.log("Attempting to reconnect WebSocket...")
        connect()
      }, 3000)
    }

    ws.onerror = (err) => {
      console.warn("WebSocket connection failed", err)
      ws.close()
    }
  }, [clearReconnectTimeout, closeCurrentSocket, getSocketUrl, profile?.id])

  useEffect(() => {
    connect()

    return () => {
      shouldReconnectRef.current = false
      clearReconnectTimeout()
      closeCurrentSocket()
    }
  }, [clearReconnectTimeout, closeCurrentSocket, connect])

  const sendMessage = useCallback((message: WebSocketEvent) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message))
    } else {
      console.warn("WebSocket is not connected. Cannot send message:", message)
    }
  }, [])

  return {
    isConnected,
    lastMessage,
    sendMessage,
  }
}
